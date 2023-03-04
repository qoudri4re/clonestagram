# Instagram Clone

An Instagram clone built with React, Django, DRF, and Axios.

## Requirements

- Python 3.6 or later
- Node.js 10 or later
- npm 6 or later

## Installation

1. Clone the repository to your local machine.

2. Install the Python packages required to run the Django app by running:
   `pip install -r requirements.txt`

3. Navigate to the `frontend` directory and install the dependencies required to run the React app by running:
   `npm install`

## Configuration

Before running the app, you'll need to configure a few settings:

1. Create a `.env` file in the root directory of the project and add the following variables:
   `JWT_SECRET=<your_jwt_secret_here>`

## Running the Project

1. In one terminal, navigate to the project's root directory and start the Django app by running the following command:
   `python manage.py runserver`
   This will start the backend on `http://localhost:8000/`.

2. In another terminal, navigate to the `frontend` directory and start the React app by running the following command:
   `npm start`
   This will start the frontend on `http://localhost:3000/`.

3. Access the app at `http://localhost:3000/`

## Usage

The Instagram clone is designed to be a social media platform where users can share photos and interact with each other. Here are some of the key features:

- User authentication and registration
- Uploading photos and captions
- Following and unfollowing other users
- Liking and commenting on photos
- Viewing other users' profiles

## Completed Features

The following features have been completed:

- User authentication and registration
- Liking and commenting on photos
- save post

## Contributing

If you'd like to contribute to the project, please fork the repository and create a new branch. Once you've made your changes, create a pull request to merge your changes into the main branch.

## Contact Information

For questions or support, please contact the project maintainer at [abdulqodrioladimeji@gmail.com.com](abdulqodrioladimeji@gmail.com).

## Acknowledgments

This project was built with the help of the following resources:

- Django documentation: https://docs.djangoproject.com/
- React documentation: https://reactjs.org/docs/getting-started.html
- DRF documentation: https://www.django-rest-framework.org/
- Axios documentation: https://axios-http.com/docs/intro
