Follow these steps to create a branch, push it, and send a pull request to the owner of a repository:

1. **Fork the repository:**  
   Create a copy of the original repository on your own GitHub account by navigating to the repository and clicking the "Fork" button in the upper-right corner.

2. **Clone your forked repository:**  
   Open a terminal or command prompt and run the following command, replacing `<your_username>` with your GitHub username and `<repo>` with the repository name:
   
    git clone https://github.com/<your_username>/<repo>.git


3. **Create a new branch:**  
Navigate to the cloned repository folder using the terminal or command prompt and create a new branch using the following command, replacing `<branch_name>` with the desired name for your new branch:

  git checkout -b <branch_name>
  

4. **Make changes and commit:**  
Make the necessary changes to the code or files in the repository. Once you're done, stage the changes using the following command:
  
  git add.
  

Commit the changes with a descriptive message:

  git commit -m "Your commit message here"
  

5. **Push the branch to your forked repository:**  
Push your branch to your forked repository on GitHub, replacing `<branch_name>` with the name of your branch:

  git push origin <branch_name>


6. **Create a pull request:**  
Go to your forked repository on GitHub and click on the "Pull Requests" tab. Click on "New Pull Request" and then click "compare across forks" if it's not selected by default. Choose the original repository as the base repository and your forked repository and branch as the head repository. Provide a descriptive title and explanation for your changes, and then click "Create Pull Request."

7. **Wait for the owner to review and merge your changes:**  
The owner of the original repository will be notified about your pull request. They will review your changes and may request additional changes or merge your pull request. If they request changes, make the necessary updates, commit, and push the changes to the same branch. Your pull request will be automatically updated.

Once the pull request is accepted and merged by the owner, your changes will be part of the original repository.


