#### Blogging with Firebase shouldn't be hard

With this application, it won't be.

# Blog Post Uploader

This electron-forge application is designed to make text-based blog posts to a Firebase blog. It uses Firebase Storage to upload a .xml file in the following form:
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

Every paragraph in the large message box is split by lines, and is put in a separate \<description\> tag. The principle is to put a script in your blog page that takes all these description tags, and puts them into \<p\> tags, or one large \<p\> tag with \<br\> tags as separators.

## Note: Deprecation

The purpose of this project was to try to securely publish posts to my blog with ease. The idea was that, by being a desktop application, the application could remain locally stored, so the public could not edit my posts. However, I realized that this was not a secure approach when I learned that Firebase considers certain project credentials of Firebase Storage as public (in the 'Inspect Element' menu, the init.js file that is loaded contains project credentials). Thus, anyone can see these credentials so everyone has access to Firebase Storage if rules permit all to write, hence Firebase Storage must be secured by using Storage Rules.

One way to distinguish a user is by using a user's ID, which comes from Firebase Authentication. The method for doing this can be found in the Firebase documentation. Unfortunately, Electron.js applications use Nodejs, for which Firebase does not offer its Authentication service, and this service can be used for the Storage Rules. Thus, authenticating users was not included in this project, so it is not recommended to use this project on its own.

To resolve this problem, I recommend this solution: Create another Firebase Hosting site, and put the code from index.js and index.css onto it. Add a button where a user can sign in. Find out what your user ID is (this can be found in the Firebase Console), and add Javascript to ensure the user can only submit if they are signed in. Then, add Firebase Storage rules to limit writing to only those users with your user ID.

I did make these changes for my personal blog, but in the interest of maximum security of credentials, I am only providing the above to resolve this issue until I can be sure that the source code for my personal blog will have airtight security. For the meantime, this provides a temporary solution for small blogs.
