const memberList = document.getElementById('memberList');
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');
let members = []; // Store fetched members globally

fetch('./data/members.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        members = data;
        displayMembers(members, 'grid-view'); // Initial display
    })
    .catch(error => {
        console.error('Error fetching or processing data:', error);
        displayErrorMessage(); // Handle the error appropriately
    });

function displayMembers(members, viewType) {
    memberList.innerHTML = '';

    members.forEach(member => {
        const card = createMemberCard(member);
        memberList.appendChild(card);
    });

    memberList.classList.remove('grid-view', 'list-view');
    memberList.classList.add(viewType);
}

function createMemberCard(member) {
    const card = document.createElement('div');
    card.classList.add('member-card');

    const img = document.createElement('img');
    img.src = member.image;
    img.alt = member.name;
    card.appendChild(img);

    const name = document.createElement('h3');
    name.textContent = member.name;
    card.appendChild(name);

    if (member.address) {
        const address = document.createElement('p');
        address.textContent = member.address;
        card.appendChild(address);
    }

    // Add phone number
    if (member.phone) {
        const phone = document.createElement('p');
        phone.textContent = member.phone;
        card.appendChild(phone);
    }

    // Add website (with link)
    if (member.website) {
        const websiteLink = document.createElement('a');
        websiteLink.href = member.website;
        websiteLink.textContent = member.website;
        websiteLink.target = "_blank";
        card.appendChild(websiteLink);
    }


    return card;
}

function displayErrorMessage() {
    memberList.innerHTML = '<p class="error-message">Error loading member data.</p>';
}

gridBtn.addEventListener('click', () => displayMembers(members, 'grid-view'));
listBtn.addEventListener('click', () => displayMembers(members, 'list-view'));