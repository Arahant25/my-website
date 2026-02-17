// Notification functions for success and error messages
function showSuccess(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 6px 20px rgba(40, 167, 69, 0.3);
        z-index: 9999;
        font-weight: 600;
        animation: slideInRight 0.5s ease-out;
        max-width: 300px;
    `;
    notification.innerHTML = `<i class="fas fa-check-circle me-2"></i>${message}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

function showError(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #dc3545, #fd7e14);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 6px 20px rgba(220, 53, 69, 0.3);
        z-index: 9999;
        font-weight: 600;
        animation: slideInRight 0.5s ease-out;
        max-width: 300px;
    `;
    notification.innerHTML = `<i class="fas fa-exclamation-triangle me-2"></i>${message}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Function to show sections (SPA navigation) with smooth transitions
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update mobile nav active state
    document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

// Login/Signup modal functions
function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function showLogin() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Form submission handlers with loading states
document.getElementById('loginFormElement').addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = e.target.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Logging in...';
    button.disabled = true;

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            showSuccess('Login successful!');
            // Close modal and update UI
            const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            modal.hide();
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError('Error logging in. Please try again.');
    } finally {
        button.textContent = originalText;
        button.disabled = false;
    }
});

document.getElementById('signupFormElement').addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = e.target.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Signing up...';
    button.disabled = true;

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (response.ok) {
            showSuccess('Signup successful! Please login.');
            showLogin();
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError('Error signing up. Please try again.');
    } finally {
        button.textContent = originalText;
        button.disabled = false;
    }
});

document.getElementById('admissionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = e.target.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Submitting...';
    button.disabled = true;

    const name = e.target[0].value;
    const mobile = e.target[1].value;
    const course = e.target[2].value;

    try {
        const response = await fetch('http://localhost:3000/submit-admission', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, mobile, course })
        });
        const data = await response.json();
        showSuccess(data.message);
        e.target.reset();
    } catch (error) {
        showError('Error submitting inquiry. Please try again.');
    } finally {
        button.textContent = originalText;
        button.disabled = false;
    }
});

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = e.target.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;

    const name = e.target[0].value;
    const email = e.target[1].value;
    const message = e.target[2].value;

    try {
        const response = await fetch('http://localhost:3000/submit-contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });
        const data = await response.json();
        showSuccess(data.message);
        e.target.reset();
    } catch (error) {
        showError('Error submitting inquiry. Please try again.');
    } finally {
        button.textContent = originalText;
        button.disabled = false;
    }
});

// Interactive course cards with AI-style animations
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', () => {
        const details = card.querySelector('ul');
        if (details.style.display === 'none' || !details.style.display) {
            details.style.display = 'block';
            details.style.animation = 'fadeIn 0.3s ease-out';
        } else {
            details.style.display = 'none';
        }
    });

    // Add hover tilt effect
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) rotateY(2deg) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Protected download functionality
document.querySelectorAll('.protected-download').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Check if user is logged in (has JWT token)
        const token = localStorage.getItem('token');

        if (!token) {
            // User not logged in - show message and open login modal
            showSuccess('Please login to download files. 🤖');
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
            return;
        }

        // User is logged in - allow download
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            // Create a temporary link and trigger download
            const tempLink = document.createElement('a');
            tempLink.href = href;
            tempLink.download = link.download || '';
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
        }
    });
});


