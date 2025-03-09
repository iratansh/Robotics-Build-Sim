import torch
import torch.nn as nn
import torch.nn.functional as F

class DQN(nn.Module):
    def __init__(self, state_dim, action_dim, hidden_dim=256, enable_double_dqn=True):
        super(DQN, self).__init__()

        self.enable_double_dqn = enable_double_dqn

        self.fc1 = nn.Linear(state_dim, hidden_dim)
        if self.enable_double_dqn:
            self.fc_value = nn.Linear(hidden_dim, 256)
            self.value = nn.Linear(256, 1)

            self.fc_advantage = nn.Linear(hidden_dim, 256)
            self.advantage = nn.Linear(256, action_dim)
        else:
            self.output = nn.Linear(hidden_dim, action_dim)

    def forward(self, x):
        x = F.relu(self.fc1(x))

        if self.enable_double_dqn:  
            value = F.relu(self.fc_value(x))
            V = self.value(value)

            advantage = F.relu(self.fc_advantage(x))
            A = self.advantage(advantage)

            Q = V + (A - torch.mean(A, dim=1, keepdim=True))

        else:
            Q = self.output(x)
        
        return Q
    
if __name__ == "__main__":
    state_dim = 12
    action_dim = 2
    net = DQN(state_dim, action_dim)
    state = torch.randn(1, state_dim)
    output = net(state)
    print(output)