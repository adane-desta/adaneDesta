


    const usersNav = document.getElementById('users-nav');
    const questionsNav = document.getElementById('questions-nav');
    const newsNav = document.getElementById('news-nav');
    const resourcesNav = document.getElementById('resources-nav');
    const appointmentsNav = document.getElementById('appointments-nav');
    const addButton = document.getElementById('add-button');
    const contentArea = document.getElementById('content-area');
    const modal = document.getElementById('modal');
    const modalForm = document.getElementById('modal-form');
    
    let activeSection = '';

    // Show the modal based on the active section
    addButton.addEventListener('click', () => {
        if (activeSection === 'news-events' || activeSection === 'resources') {
            modal.style.display = 'flex';
        } else {
            alert('Please select a valid section first!');
        }
    });

    // Close the modal when clicking outside it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Submit form 
    modalForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const type = document.getElementById('type').value;
        const description = document.getElementById('description').value;
        const imageFile = document.getElementById('image');
        const actualResource = document.getElementById('actual_resource');
        const language_code = document.getElementById('language').value;


        const formData = new FormData();   
        formData.append('title', title);
        formData.append('type', type);
        formData.append('description', description);
        formData.append('image', imageFile.files[0]);
        formData.append('actualResource', actualResource.files[0]);

        const localization = [
            {
                language_code: language_code,
                title: title,
                description: description
            }
        ];

        const response = await fetch('https://ethio-animal-health.onrender.com/api/'+activeSection, {
            method: 'POST',
            body: JSON.stringify({
                newsEvent: { title, type, description, date: new Date().toISOString(), image_url: `dbResources/images/${image.files[0].name}` , actual_resource_url: `/${'dbResources/'+activeSection}/${actualResource.files[0].name}` },
               
                localization: localization
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('New '+activeSection+ ' added successfully!');
            modalForm.reset();
            getNewsEventsAndResources();
            modal.style.display = 'none';
        } else {
            alert('Failed to add '+activeSection);
        }
    });


    

    document.getElementById('language').addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        const translations = {
            en: {
                modalTitle: "Add News/Event",
                titlePlaceholder: "Title",
                typePlaceholder: "Type (e.g., article, video)",
                descriptionPlaceholder: "Description",
            },
            am: {
                modalTitle: "አዲስ መረጣ/ክስተት ያይዱ",
                titlePlaceholder: "ርዕስ",
                typePlaceholder: "አይንት (ምሳሊ፡ ጭሎፍ， ቪዲዮ)",
                descriptionPlaceholder: "መግለጫ",
                submit: "አስ"
            },
            or: {
                modalTitle: "Qabiyyee Haaraa Galchi",
                titlePlaceholder: "Mata Duree",
                typePlaceholder: "Gosa (e.g., barruu, viidiyoo)",
                descriptionPlaceholder: "Ibsa",
                submit : "galchi",
            },
        };

        const translation = translations[selectedLanguage];
        if (translation) {
            document.getElementById('modal-title').textContent = translation.modalTitle;
            document.getElementById('title').placeholder = translation.titlePlaceholder;
            document.getElementById('type').placeholder = translation.typePlaceholder;
            document.getElementById('description').placeholder = translation.descriptionPlaceholder;
            document.getElementById("submitBtn").textContent = translation.submit;
        }
    });

// Display users section

usersNav.addEventListener('click' , () => {
    
    addButton.style.display = 'none';
    activeSection = 'users';
    getUsers('all' , 'All')

})

 const getUsers = async (userType , selected) => {

     const response = await fetch(`https://ethio-animal-health.onrender.com/api/users/${userType}`);

     const users = await response.json();
     contentArea.innerHTML = `
        <div class="section-title">Manage Users</div>
        <div class="card">
            <table>
                <thead>      
                  <div class="user-selector">
                    <select id="user-selector">
                      <option value = "" , disabled , selected>${selected}</option>
                      <option value="all">All</option>
                      <option value="FARMERS">farmers</option>
                      <option value="VETERINARIANS">veterinarians</option>
                    </select>
                  </div>
                </thead>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map(user => `
                        <tr>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td><button class="delete-btn" onclick="deleteUser(${user.id} , '${user.type}' )">Delete</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    document.getElementById('user-selector').addEventListener('change', (event) => {
        getUsers(event.target.value , event.target.value);
        
        
    });
};

const deleteUser = async (user_id , type) => {
    
    try{
       const response = await fetch(`https://ethio-animal-health.onrender.com/api/deleteUser/${user_id}?userType=${type}` , {
       method: 'DELETE'
       });

       if(response.ok) {
        alert('User deleted successfully');
        getUsers(type , type)

       }else{
        alert('failed to delete the user');
      }
    }catch{
        alert('soryy something went wrong')
    }
    
}



// Display questions section

questionsNav.addEventListener('click', () => {
    activeSection = 'questions'; // Update active section
    addButton.style.display = 'none';
    getUserQuestion();
});

const getUserQuestion =  async () => {

   
    const response = await fetch('https://ethio-animal-health.onrender.com/api/getUserQuestion')
    const userQuestions = await response.json();
    contentArea.innerHTML = `
        <div class="section-title">Manage Questions</div>
        <div class="card">
            <table>
                <thead>
                    <tr>  
                        <th>Name</th>
                        <th>email/phone</th>
                        <th>question</th>
                        <th>address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${userQuestions.map(question => `
                        <tr>
                            <td>${question.name}</td>
                            <td>${question.emailorphone}</td>
                            <td>${question.question_text}</td>
                            <td>${question.address}</td>
                            <td><button class="delete-btn" onclick="deleteUserQuestion('${question.question_id}')">Delete</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
};


// delete user questions

const deleteUserQuestion = async (question_id) => {
   
    try {
        const response = await fetch(`https://ethio-animal-health.onrender.com/api/deleteUserQuestion/${question_id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert(activeSection+' deleted successfully!');
            getUserQuestion();
        } else {
            alert('Failed to delete.');
        }
    } catch (error) {
        console.error('Error deleting the question:', error);
        alert('Failed to delete the question.');
    }
};


// Fetch and display news events

const getNewsEventsAndResources = async () => {
   
    const response = await fetch('https://ethio-animal-health.onrender.com/api/'+activeSection+'?language_code=en');
    const news = await response.json();

    contentArea.innerHTML = `
        <div class="section-title">Manage ${activeSection}</div>
        <div class="card">
            <table>
                <thead>
                    <tr>
                        <th> news id</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${news.map(item => 
                        
                        `<tr>
                            <td>${item.id}</td>
                            <td>${item.title}</td>
                            <td>${item.type}</td>
                            <td>${item.description}</td>
                            <td><button class="delete-btn" onclick="deleteNewsEventAndResource(${item.id})">Delete</button></td>
                        </tr>`
                    ).join('')}
                </tbody>
            </table>
        </div>
    `;
};

// Delete news event
const deleteNewsEventAndResource = async (id) => {
   
    try {
        const response = await fetch(`https://ethio-animal-health.onrender.com/api/${activeSection}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert(activeSection+' deleted successfully!');
            getNewsEventsAndResources(); 
        } else {
            alert('Failed to delete news/event.');
        }
    } catch (error) {
        console.error('Error deleting news/event:', error);
        alert('Failed to delete news/event.');
    }
};


// Display news and events section

newsNav.addEventListener('click', () => {
    activeSection = 'news-events'; // Update active section
    document.getElementById('label1').textContent = "upload image to describe the news/event(imagefile only)"
    document.getElementById('label2').textContent = "upload news/event(video or pdf only)"
    addButton.style.display = 'flex';
    getNewsEventsAndResources();

});

resourcesNav.addEventListener('click', () => {
    activeSection = 'resources'; // Update active section
    document.getElementById('modal-title').textContent = 'Add New '+activeSection;
    document.getElementById('label1').textContent = "upload image to describe resource(imagefile only)"
    document.getElementById('label2').textContent = "upload actual resource(video or pdf only)"
    addButton.style.display = 'flex';
    getNewsEventsAndResources();

});


const getAppointment = async () =>{

    const response = await fetch('https://ethio-animal-health.onrender.com/api/getAppointment');
    const appointments = await response.json();
    
    contentArea.innerHTML = `
        <div class="section-title">Manage Appointments</div>
        <div class="card">
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>date and time</th>
                        <th>reason</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${appointments.map(appointment => `
                        <tr>
                            <td>${appointment.name}</td>
                            <td>${appointment.email}</td>
                            <td>${appointment.phone}</td>
                            <td>${appointment.date}</td>
                            <td>${appointment.reason}</td>
                            <td><button class="delete-btn" onclick="deleteAppointment(${appointment.appointment_id})">Delete</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

}


 const deleteAppointment = async (appointment_id) => {
    try {
        const response = await fetch(`https://ethio-animal-health.onrender.com/api/delete_appointment/${appointment_id}`, {
             method: 'DELETE'
        });

        if (response.ok) {
            alert('appointment deleted successfully')
            getAppointment();
        } else {
           alert('faild to deleted appointment');
        }
    } catch (error) {
         alert('sorry something went wrong')
    }
}

appointmentsNav.addEventListener('click', async () => {
    addButton.style.display = 'none';
    activeSection = 'appointments'; 
    getAppointment();

});
   
