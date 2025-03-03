import flappy_bird_gymnasium
from dqn import DQN
import gymnasium
from experience_replay import ReplayMemory
import itertools
import yaml, random
import torch
import os
import matplotlib

device = "cpu"
DATE_FORMAT = "%m-%d-%Y"
RUNS_DIR = "runs"
os.makedirs(RUNS_DIR, exist_ok=True)
matplotlib.use("Agg")

class Agent:
    def __init__(self, hyperparameter_set):
        with open("hyperparameters.yml", "r") as f:
            all_hyperparameters = yaml.safe_load(f)
            hyperparameters = all_hyperparameters[hyperparameter_set]

        self.env_id = hyperparameters["env_id"]
        self.replay_memory_size = hyperparameters["replay_memory_size"]
        self.mini_batch_size = hyperparameters["mini_batch_size"]
        self.epsilon_init = hyperparameters["epsilon_init"]
        self.epsilon_decay = hyperparameters["epsilon_decay"]
        self.epsilon_min = hyperparameters["epsilon_min"]
        self.network_sync_rate = hyperparameters["network_sync_rate"]
        self.learning_rate_a = hyperparameters["learning_rate_a"]
        self.discount_factor_g = hyperparameters["discount_factor_g"]
        self.stop_on_reward = hyperparameters["stop_on_reward"]
        self.fc1_nodes = hyperparameters["fc1_nodes"]
        self.env_make_params = hyperparameters.get("env_make_params", {})

        self.loss_fn = torch.nn.MSELoss()
        self.optimizer = None

        self.LOG_FILE = os.path.join(RUNS_DIR, f"{hyperparameter_set}_{DATE_FORMAT}.log")
        self.MODEL_FILE = os.path.join(RUNS_DIR, f"{hyperparameter_set}_{DATE_FORMAT}.pt")
        self.GRAPH_FILE = os.path.join(RUNS_DIR, f"{hyperparameter_set}_{DATE_FORMAT}.png")  
      

    def run(self, is_training=True, render=False):
        # env = gymnasium.make("FlappyBird-v0", render_mode="human" if render else None, use_lidar = False)
        env = gymnasium.make("CartPole-v1", render_mode="human" if render else None)
        
        num_states = env.observation_space.shape[0]
        num_actions = env.action_space.n
        rewards_per_episode = []
        epsilon_history = []
        policy_dqn = DQN(num_states, num_actions).to(device)

        if is_training:
            memory = ReplayMemory(self.replay_memory_size)

            epsilon = self.epsilon_init
            target_dqn = DQN(num_states, num_actions).to(device)    
            target_dqn.load_state_dict(policy_dqn.state_dict())
            step_count = 0
            self.optimizer = torch.optim.Adam(policy_dqn.parameters(), lr=self.learning_rate_a)

        for episode in itertools.count():
            state, _ = env.reset()
            state = torch.tensor(state, dtype=torch.float, device=device)

            terminated = False
            episode_reward = 0.0

            while not terminated:
                if is_training and random.random() < epsilon:
                    action = env.action_space.sample()
                    action = torch.tensor(action, dtype=torch.int64, device=device)
                else:
                    with torch.no_grad():
                        action = policy_dqn(state.unsqueeze(dim=0)).squeeze().argmax()
               
                new_state, reward, terminated, _, info = env.step(action.item())
                episode_reward += reward

                new_state = torch.tensor(new_state, dtype=torch.float, device=device)
                reward = torch.tensor(reward, dtype=torch.float, device=device)

                if is_training:
                    memory.append((state, action, new_state, reward, terminated))
                    step_count += 1

                state = new_state
            

            rewards_per_episode.append(episode_reward)
            epsilon = max(epsilon * self.epsilon_decay, self.epsilon_min)
            epsilon_history.append(epsilon)

            if len(memory) > self.mini_batch_size:
                mini_batch = memory.sample(self.mini_batch_size)    
                self.optimize(mini_batch, policy_dqn, target_dqn)
                if step_count > self.network_sync_rate:
                    target_dqn.load_state_dict(policy_dqn.state_dict())
                    step_count = 0
    def optimize(self, mini_batch, policy_dqn, target_dqn):
        states, actions, new_states, rewards, terminations = zip(*mini_batch)
        states = torch.stack(states)
        actions = torch.stack(actions)
        new_states = torch.stack(new_states)
        rewards = torch.stack(rewards)
        terminations = torch.tensor(terminations).float().to(device)

        with torch.no_grad():
            target_q = rewards + (1 - terminations) * self.discount_factor_g * target_dqn(new_states).max(dim=1)[0]
        
        current_q = policy_dqn(states).gather(1, actions.unsqueeze(1)).squeeze()

        loss = self.loss_fn(current_q, target_q)
        self.optimizer.zero_grad()
        loss.backward() 
        self.optimizer.step()

        



if __name__ == "__main__":
    agent = Agent("cartpole1")
    agent.run(render=True)