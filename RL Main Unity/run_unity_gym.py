from mlagents_envs.environment import UnityEnvironment
from gym_unity.envs import UnityToGymWrapper
from stable_baselines3 import PPO

unity_exe_path = "/Users/ishaanratanshi/UnityRoboticsSim/Build.app"
unity_env = UnityEnvironment(file_name=unity_exe_path)
gym_env = UnityToGymWrapper(unity_env, allow_multiple_obs=False) # Wrap the environment to make it compatible with OpenAI Gym

# Test the environment: reset and take a random action
obs = gym_env.reset()
print("Initial Observation:", obs)
action = gym_env.action_space.sample()
obs, reward, done, info = gym_env.step(action)
print(f"Step Output -> Obs: {obs}, Reward: {reward}, Done: {done}")

# Train a simple PPO model
model = PPO("MlpPolicy", gym_env, verbose=1, render=False)
model.learn(total_timesteps=10000)
model.save("simple_agent_model")

gym_env.close()
