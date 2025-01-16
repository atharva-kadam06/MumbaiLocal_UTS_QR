function show_hide() {
    const content = document.getElementById('hide-content');
    const button = document.getElementById('btn');
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        button.textContent = 'Hide';
    } else {
        content.classList.add('hidden');
        button.textContent = 'Show';
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI elements
    let btn = document.getElementById('btn');
    let hide_content = document.getElementById('hide-content');
    let mybutton = document.getElementById("myBtn");
    
    // Handle railway selection
    let railway = document.getElementsByName('railway');
    const sections = ['harbour', 'central', 'western'];

    for (let i = 0; i < railway.length; i++) {
        railway[i].addEventListener('input', () => {
            const selectedValue = railway[i].value;
            
            // Hide all sections first
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    element.style.display = 'none';
                }
            });
            
            // Show selected section
            const selectedSection = document.getElementById(selectedValue);
            if (selectedSection) {
                selectedSection.style.display = 'block';
            }
        });
    }

    // URL handling
    try {
        let url = new URL(window.location.href);
        url.search = '';
        const result = url.toString();

        if (window.location.href !== result && 
            window.location.href !== "https://moinmn.github.io/MumbaiLocal-QR/") {
            window.location.href = result;
        }
    } catch (error) {
        console.error("Error handling URL:", error);
    }

    // Show/Hide content functionality
    if (btn && hide_content) {
        btn.addEventListener('click', function() {
            if(hide_content.style.display == 'none'){
                hide_content.style.display = 'block';
                btn.innerHTML = 'Hide';
            } else {
                hide_content.style.display = 'none';
                btn.innerHTML = 'Show';
            }
        });
    }

    // Search functionality
    window.searchFun = () => {
        let search = document.getElementById('search');
        if (!search) return;
        
        let searchValue = search.value.toUpperCase();
        let count = 0;

        let content = document.getElementById('content');
        if (!content) return;
        
        let station = content.getElementsByTagName('h3');

        for(var i = 0; i < station.length; i++) {
            let ss = station[i].innerHTML.toUpperCase();
            let attri = station[i].getAttribute('id');
            
            if (ss.includes(searchValue) && attri) {
                count = 1;
                window.location.href = '#' + attri;
                break;
            }
        }

        if (count === 0){
            alert("Station Name Not Found.");
        }
    }

    // Scroll to top functionality
    if (mybutton) {
        window.onscroll = function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        };

        // Make topFunction globally available
        window.topFunction = () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }
});

document.querySelectorAll('.box img').forEach(img => {
    img.addEventListener('click', function() {
        // Create popup container
        const popup = document.createElement('div');
        popup.className = 'qr-popup';
        
        // Clone the image
        const popupImg = this.cloneNode();
        
        // Add click event to close popup
        popup.addEventListener('click', function() {
            this.remove();
        });
        
        // Add image to popup and popup to body
        popup.appendChild(popupImg);
        document.body.appendChild(popup);
    });
});

