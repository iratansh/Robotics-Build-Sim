### Summary
This codebase implements a **Deep Q-Network (DQN)** for reinforcement learning.  

#### **Key Components & Their Roles**  
1. **`ReplayMemory`**  
   - Stores past experiences (state, action, reward, next state).  
   - Uses a `deque` for efficient memory management.  
   - Allows the agent to sample random batches for training, reducing correlation between consecutive experiences.  

2. **`agent.py`**  
   - Likely implements the **reinforcement learning agent** that interacts with the environment.  
   - Uses `ReplayMemory` to store experiences and retrieve training batches.  
   - Contains logic for selecting actions based on the learned policy.  

3. **`dqn.py`**  
   - Implements the **Deep Q-Network (DQN)** algorithm.  
   - Likely defines the **neural network architecture** used for Q-learning.  
   - Performs forward passes to predict Q-values for given states and actions.  
   - Updates the network using backpropagation and an optimization algorithm.  

---

### **Technologies Used**  
- **Python Standard Library**:  
  - `collections.deque` (for experience replay buffer)  
  - `random` (for sampling training batches)  
- **Deep Learning & Reinforcement Learning**:  
  - **PyTorch or TensorFlow (likely used in `dqn.py`)** for implementing the DQN model.  
  - **Deep Q-Learning (DQN)**: A deep learning-based RL algorithm that approximates Q-values using a neural network.  
- **Machine Learning Concepts**:  
  - Experience Replay  
  - Q-Learning  
  - Neural Network Training  

- **Citations**:
https://www.youtube.com/watch?v=arR7KzlYs4w&list=PL58zEckBH8fCMIVzQCRSZVPUp3ZAVagWi&ab_channel=JohnnyCode