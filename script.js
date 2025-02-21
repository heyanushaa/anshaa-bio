document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const editBioBtn = document.getElementById('edit-bio');
    const bioText = document.querySelector('.bio-text');
    const addSkillBtn = document.getElementById('add-skill');
    const skillInput = document.getElementById('skill-input');
    const skillsList = document.getElementById('skills-list');

    // Edit Bio Functionality
    editBioBtn.addEventListener('click', () => {
        const currentBio = bioText.textContent.trim();
        const newBio = prompt('Edit your bio:', currentBio);
        
        if (newBio !== null && newBio !== '') {
            bioText.textContent = newBio;
            // Save to localStorage
            localStorage.setItem('userBio', newBio);
        }
    });

    // Add Skill Functionality
    addSkillBtn.addEventListener('click', () => {
        addSkill();
    });

    skillInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addSkill();
        }
    });

    function addSkill() {
        const skillText = skillInput.value.trim();
        
        if (skillText !== '') {
            // Create new skill tag
            const skillTag = document.createElement('span');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skillText;
            
            // Add delete functionality
            skillTag.addEventListener('dblclick', () => {
                if (confirm('Remove this skill?')) {
                    skillTag.remove();
                    saveSkills();
                }
            });

            skillsList.appendChild(skillTag);
            skillInput.value = '';
            saveSkills();
        }
    }

    // Save and Load functions
    function saveSkills() {
        const skills = Array.from(skillsList.getElementsByClassName('skill-tag'))
            .map(skill => skill.textContent);
        localStorage.setItem('userSkills', JSON.stringify(skills));
    }

    function loadSavedData() {
        // Load bio
        const savedBio = localStorage.getItem('userBio');
        if (savedBio) {
            bioText.textContent = savedBio;
        }

        // Load skills
        const savedSkills = JSON.parse(localStorage.getItem('userSkills') || '[]');
        savedSkills.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            
            skillTag.addEventListener('dblclick', () => {
                if (confirm('Remove this skill?')) {
                    skillTag.remove();
                    saveSkills();
                }
            });

            skillsList.appendChild(skillTag);
        });
    }

    // Load saved data when page loads
    loadSavedData();

    // Add tooltip for skill deletion
    const tooltip = document.createElement('div');
    tooltip.textContent = 'Double-click any skill to remove it';
    tooltip.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 14px;
        opacity: 0.9;
    `;
    document.body.appendChild(tooltip);

    // Hide tooltip after 5 seconds
    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 5000);
});
