import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.metrics import classification_report, accuracy_score

# Step 1: To simulate LTM radio conditions
# Two features are simulated for each sample:
# - SINR_current: the SINR of the current beam
# - SINR_alternative: the SINR of the best alternative beam
np.random.seed(42)  # Set seed for reproducibility
n_samples = 600  # Number of samples to generate

# To simulate current SINR with mean -5 dB and standard deviation 6 dB
SINR_current = np.random.normal(loc=-5, scale=6, size=n_samples)

# To simulate alternative beam SINR with mean +5 dB and standard deviation 7 dB
SINR_alternative = np.random.normal(loc=5, scale=7, size=n_samples)

# Step 2: To define supervised learning labels
# If alternative beam SINR > 0 dB, label = 0 (switch beam)
# Otherwise, label = 1 (fast handover required)
y = np.where(SINR_alternative > 0, 0, 1)

# Step 3: To combine features into a feature matrix X
X = np.column_stack((SINR_current, SINR_alternative))

# Step 4: To split the data into training and testing sets
# We use 70% of the data for training and 30% for testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Step 5: To train a Decision Tree classifier
# there max depth of 3 used to keep the tree interpretable
clf = DecisionTreeClassifier(max_depth=3, random_state=42)
clf.fit(X_train, y_train)  # Train the classifier on the training data

# Step 6: To Predict and evaluate the classifier
# To Predict labels for the test set
y_pred = clf.predict(X_test)

# To print classification report and accuracy score
print("\nClassification Report:")
print(classification_report(y_test, y_pred))
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")

# Step 7: To visualize the trained decision tree
# This plot shows the decision rules learned by the model
plt.figure(figsize=(10, 6))
plot_tree(clf, feature_names=['SINR_current', 'SINR_alternative'],
          class_names=['Beam Switch', 'Fast HO'], filled=True)
plt.title("Decision Tree for LTM: Beam Switch vs Fast Handover")
plt.show()
