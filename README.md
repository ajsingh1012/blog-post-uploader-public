# blog-post-uploader-public

This is an Electron.js and Firebase application for uploading a simple text-based blog post.

## Functionality

The process of this application is as follows:
1. The user opens the application
2. The user is presented with a form to post a blog entry, where the user can choose a title, date, and message for the blog post.
3. The message is split by lines, and each 'paragraph' is put in a separate \<description\> tag.
4. On clicking the 'Post' button, a *.xml* file is created, and the date chosen for the blog post is used as the filename \(i.e. \<filename\>.xml\). Note, the implications are as follows:
    1. As the application uses Firebase, the date becomes the filename for the data sent to Firebase Storage. Thus, as the file is uniquely identified by the date, if a file is uploaded to Firebase Storage with the same date as another file, the new file will overwrite the preexisting file in Firebase Storage.
    2. This means there can only be one blog post per date.
    3. This also means that, if a user intends to 'edit' a blog post, this can be imitated by copying the information from the previous blog post and putting it in a new blog post, to overwrite the old one.
5. The file is uploaded to Firebase Storage.

Note: The file that is created may not be a pure RSS file. Simply put, it creates a format as follows:
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
    <info>
        <title>Title</title>
        <date>Date</date>
    </info>
    <message>
        <description>Paragraph 1</description>
        <description>Paragraph 2</description>
        ...
        <description>Paragraph n</description>
    </message>
</channel>
</rss>
```

## Running the application on your computer

After cloning the repository, there are some important steps to follow before this project can function as intended.
You will need:
- Node.js, npm installed
- A Google account (hence also a Firebase account)

First, the user will have to run
```sh
cd post-uploader
npm install
```
This will install the application dependencies.
The next step is to create a Firebase project:
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Add a new app, and copy the config information.
4. Add the config information to post-uploader/src/index.html (in the TODO space).
5. Set up a Firebase Storage bucket.
6. Add a folder to the Firebase Storage bucket, 'posts'.

The next step is to run the application:
```sh
npm start
```
This should run the application.

## Note
Please change post-uploader/storage.rules as needed to secure Firebase Storage.
