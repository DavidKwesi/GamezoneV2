const stories = [
    { title: "Story 1", text: "This is the first story. It has simple words for testing.", type: "text" },
    { title: "Story 2", text: "This is the second story. It is slightly more complex and longer.", type: "text" },
];

let currentWords = [];
let currentWordIndex = 0;
let readingInterval;

function displayStories() {
    const storyList = document.getElementById('storyList');
    storyList.innerHTML = '';
    stories.forEach((story, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = story.title;
        storyList.appendChild(option);
    });
    storyList.onchange = () => openStory(storyList.value);
}

function redirectToEasypage(){
    window.location.href="EasyRead.html";
}

function redirectToReadingPage(){
    window.location.href="ReadingMainPage.html";
}