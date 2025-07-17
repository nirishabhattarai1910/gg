 document.addEventListener('DOMContentLoaded', () => {
            const hamburger = document.querySelector('.hamburger');
            const mobileNavlinks = document.querySelector('.mobile-navlinks');
            const closeBtn = document.querySelector('.mobile-navlinks .close-btn');
            const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
            // Get all dropdowns, including those in the main nav and mobile nav
            const allDropdowns = document.querySelectorAll('.dropdown');

            // Function to toggle mobile menu
            function toggleMobileMenu() {
                mobileNavlinks.classList.toggle('active');
                mobileMenuOverlay.classList.toggle('active');
                document.body.style.overflow = mobileNavlinks.classList.contains('active') ? 'hidden' : ''; // Prevent scrolling when menu is open
            }

            // Open mobile menu
            hamburger.addEventListener('click', toggleMobileMenu);

            // Close mobile menu
            closeBtn.addEventListener('click', toggleMobileMenu);
            mobileMenuOverlay.addEventListener('click', toggleMobileMenu); // Close when clicking outside menu

            // Handle dropdowns for both desktop and mobile
            allDropdowns.forEach(dropdown => {
                const dropdownToggle = dropdown.querySelector('.dropdown > a');
                const subMenu = dropdown.querySelector('.sub-menu');

                dropdownToggle.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent default link behavior for dropdown toggles

                    const isDesktop = window.innerWidth > 992;
                    const isMobileMenuDropdown = dropdown.closest('.mobile-navlinks');

                    // If it's a desktop dropdown, close others on click
                    if (isDesktop) {
                        allDropdowns.forEach(otherDropdown => {
                            // Only close other desktop dropdowns
                            if (otherDropdown !== dropdown && otherDropdown.closest('.navlinks') && otherDropdown.classList.contains('active')) {
                                otherDropdown.classList.remove('active');
                            }
                        });
                        dropdown.classList.toggle('active'); // Toggle the clicked desktop dropdown
                    }
                    // If it's a mobile menu dropdown
                    else if (isMobileMenuDropdown) {
                        // Close all other mobile menu sub-menus
                        mobileNavlinks.querySelectorAll('.dropdown').forEach(otherMobileDropdown => {
                            if (otherMobileDropdown !== dropdown && otherMobileDropdown.classList.contains('active')) {
                                otherMobileDropdown.classList.remove('active');
                                const otherMobileSubMenu = otherMobileDropdown.querySelector('.sub-menu');
                                if (otherMobileSubMenu) {
                                    otherMobileSubMenu.style.display = 'none';
                                }
                            }
                        });
                        // Toggle the clicked mobile menu sub-menu
                        dropdown.classList.toggle('active');
                        if (subMenu) {
                            subMenu.style.display = dropdown.classList.contains('active') ? 'block' : 'none';
                        }
                    }
                });

                // Add hover functionality back for desktop
                dropdown.addEventListener('mouseenter', () => {
                    if (window.innerWidth > 992) {
                        dropdown.classList.add('active');
                    }
                });

                dropdown.addEventListener('mouseleave', () => {
                    if (window.innerWidth > 992) {
                        // Only remove 'active' class if it was added by hover, not by click
                        // This ensures click-to-close works reliably on desktop.
                        if (dropdown.classList.contains('active') && !dropdownToggle.classList.contains('clicked-active')) {
                            dropdown.classList.remove('active');
                        }
                    }
                });
            });

            // Close dropdowns when clicking anywhere outside the navbar or mobile menu
            document.addEventListener('click', (e) => {
                const isClickInsideNavbar = e.target.closest('.navbar');
                const isClickInsideMobileMenu = e.target.closest('.mobile-navlinks');

                if (!isClickInsideNavbar && !isClickInsideMobileMenu) {
                    allDropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                        const subMenu = dropdown.querySelector('.sub-menu');
                        if (subMenu) {
                            subMenu.style.display = 'none'; // Ensure sub-menu is hidden
                        }
                    });
                }
            });

            // Close mobile menu if window is resized to desktop size
            window.addEventListener('resize', () => {
                if (window.innerWidth > 992 && mobileNavlinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });