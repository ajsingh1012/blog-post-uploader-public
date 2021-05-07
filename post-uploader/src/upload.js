var posts;

document.addEventListener('DOMContentLoaded', function() {
    posts = firebase.storage().ref('posts');
    var perf = firebase.performance(); // call to activate
});

//listen for submit event
document.getElementById('blogForm').addEventListener('submit', formSubmit);

//Submit form
function formSubmit(e) {
    e.preventDefault();
    // Get Values from the DOM
    let title = document.querySelector('#titleInput').value;
    let date = document.querySelector('#dateInput').value;
    let message = document.querySelector('#messageInput').value;

    console.log(title);
    console.log(date);
    console.log(message);
    
    //Submit message
    putBlogPost(title, date, message);

    //Form Reset After Submission
    document.getElementById('blogForm').reset();
}

function putBlogPost(title, date, message) {
    var messages = message.split('\n');

    var arr = ['<?xml version="1.0" encoding="UTF-8" ?>',
                addLine('<rss version="2.0">'),
                addLine('<channel>'),
                addIndentedLine('<info>', 1),
                addIndentedLine('<title>' + title + '</title>', 2),
                addIndentedLine('<date>' + date + '</date>', 2),
                addIndentedLine('</info>', 1),
                addIndentedLine('<message>', 1)];

    for(var i = 0; i < messages.length; i++) {
        arr.push(addIndentedLine('<description>' + messages[i] + '</description>', 2));
    }
    arr = arr.concat([addIndentedLine('</message>', 1),
                addLine('</channel>'),
                addLine('</rss>')]);

    var text = arr.join('');

    var newFile = new File([text], date + '.xml', {
        type: "text/xml",
    });

    console.log(text);
    uploadBlob(newFile, date);
}

function uploadBlob(file, date) {
    const ref = posts.child(date + '.xml');
  
    // 'file' comes from the Blob or File API
    ref.put(file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    }).catch((error) => {
        console.log(error);
    });
  }

function addLine(line) {
    return '\n' + line;
}

function addIndentedLine(line, indents) {
    return addLine(' '.repeat(4*indents) + line)
}