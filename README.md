# Posts Management Dashboard

## Installation Guide
### Prerequisites
 - Yarn must be installed globally on your system.
### Check if Yarn is installed:
```bash
yarn --version
```
- if yarn is not installed checkout [Installation Guid](https://yarnpkg.com/getting-started/install)

### Install Dependencies
```bash
yarn install
```

## Scripts
- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## UX/UI decisions

### UI library
For UI components I chose Material UI components, as quick way to build UI for the app

### UX decisions
I have decided to separate the app into three pages: a user list page, a user post management page, and a post page.

The user list page is a preview screen where each user is displayed. On this page, only one post per user is shown to make the list more compact and easier to scroll through.

In the user post management screen, it is possible to add or delete posts. I chose a modal view for adding posts since creating a post does not involve much functionality. Comments are displayed on the post page for the same reason — to make the post list shorter and to avoid firing multiple API requests simultaneously.

Regarding the UX example in the assignment, which suggests rendering each post under each user and each comment under each post, I have decided this is not a viable solution with the current API. The API does not provide a way to fetch posts by user ID or comments by post ID in bulk.

## Possible Improvements
### API
I would add the ability to fetch posts by user ID in bulk, which would eliminate the need for multiple requests to retrieve user posts in the user list. I would also apply the same approach for comments. Additionally, I would implement pagination for the requests to handle the lists more efficiently.

### UI/UX
I would add:
- Optimistic rendering for a smoother user experience when creating or deleting posts.
- Pagination to efficiently handle larger lists of users and posts.
- A search bar to allow users to search for specific users or posts.
- Error toasts to provide feedback if any error appears.
- The ability to edit posts (which might actually be a requirement to complete the full CRUD functionality).

### Technical
I would improve:
- Error handling to cover various edge cases.
- Finish covering the code with tests. Note for absent reducers tests.
- Fix the issue where running the lint command in the terminal throws an error due to a TypeScript mismatch.
