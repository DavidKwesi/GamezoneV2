document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailOrUsername = document.getElementById('emailOrUsername').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailOrUsername, password })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        alert(result.message);

        if (response.ok) {
            localStorage.setItem('username', result.username);
            window.location.href = "homepage.html";
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to log in');
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const wordElement = document.getElementById('gamified');
    const originalWord = wordElement.innerText;
    const phrases = ["TENACITY","WHAT'S THAT SMELL?", "LIFE IS PERFECT","NO PREJUDICE","NO FEAR OF JUDGEMENT","FUN","NO LIMITS","ENTHUSIASM","LEAD CHARACTER","COMPOSURE"];
    let phraseIndex = 0;

    const letters = originalWord.split('');
    wordElement.innerHTML = letters.map(letter => `<span class="letter">${letter}</span>`).join('');
    const letterElements = Array.from(document.querySelectorAll('.letter'));

    wordElement.addEventListener('mouseover', () => {
        const newPhrase = phrases[phraseIndex].split('');
        const newColors = generateRandomColors(newPhrase.length);

        letterElements.forEach((element, index) => {
            element.style.transform = 'translateY(-50px)';
            setTimeout(() => {
                element.innerText = newPhrase[index] || ' ';
                element.style.transform = 'translateY(0)';
                element.style.backgroundColor = newColors[index];
                element.style.color = '#ffffff';
            }, 300);
        });

        phraseIndex = (phraseIndex + 1) % phrases.length;
    });

    wordElement.addEventListener('mouseleave', () => {
        const originalColors = generateRandomColors(letters.length);

        letterElements.forEach((element, index) => {
            element.style.transform = 'translateY(-50px)';
            setTimeout(() => {
                element.innerText = letters[index];
                element.style.transform = 'translateY(0)';
                element.style.backgroundColor = originalColors[index];
                element.style.color = 'gold';
            }, 300);
        });
    });

    function generateRandomColors(numColors) {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            colors.push(color);
        }
        return colors;
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailOrUsername = document.getElementById('emailOrUsername').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailOrUsername, password })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        alert(result.message);

        if (response.ok) {
            window.location.href = "homepage.html";
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to log in');
    }
});

function redirectToHomepage() {
    window.location.href = "homepage.html";
}
