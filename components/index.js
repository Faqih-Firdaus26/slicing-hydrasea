let lightLayer, darkLayer;

document.addEventListener("DOMContentLoaded", function () {
  // Inisialisasi peta
  const map = L.map("map", {
    zoomControl: true,
  }).setView([-6.2088, 106.8456], 10);

  // Layer untuk light mode (OpenStreetMap default)
  const lightLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }
  );

  // Layer untuk dark mode (CartoDB Dark Matter)
  const darkLayer = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors, © CARTO",
    }
  );

  // Tambahkan layer default (light mode)
  function updateMapTheme(isDark) {
    // Hapus semua tile layer yang ada
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    // Tambahkan layer sesuai tema
    if (isDark) {
      darkLayer.addTo(map);
    } else {
      lightLayer.addTo(map);
    }
  }

  // Fungsi untuk positioning modal relatif ke elemen sumber
  function positioning(sourceElement, targetModal) {
    const rect = sourceElement.getBoundingClientRect();
    const modalWidth = targetModal.offsetWidth;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let leftPosition = rect.right + 10;
    if (leftPosition + modalWidth > viewportWidth - 20) {
      leftPosition = Math.max(20, rect.left - modalWidth - 10);
    }

    let topPosition = rect.top;
    const modalHeight = targetModal.offsetHeight;
    if (topPosition + modalHeight > viewportHeight - 20) {
      topPosition = Math.max(20, viewportHeight - modalHeight - 20);
    }

    targetModal.style.top = `${topPosition}px`;
    targetModal.style.left = `${leftPosition}px`;
  }

  // Existing JavaScript code
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  const navItems = document.querySelectorAll(".nav-item");

  // Control buttons and modals
  const mapControlBtn = document.getElementById("mapControlBtn");
  const infoControlBtn = document.getElementById("infoControlBtn");
  const navControlBtn = document.getElementById("navControlBtn");
  const mapModal = document.getElementById("mapModal");
  const layerModal = document.getElementById("layerModal");
  const navigationModal = document.getElementById("navigationModal");

  // Get the position of the hamburger container to align the menu
  const hamburgerContainer = document.querySelector(".hamburger-container");
  const hamburgerRect = hamburgerContainer.getBoundingClientRect();

  // Set the menu position to be exactly below the hamburger menu
  navMenu.style.top = hamburgerRect.bottom + 5 + "px";
  navMenu.style.left = hamburgerRect.left + "px";

  // Track menu state
  let menuState = "closed";
  let activeModal = null;

  // Handle filter modal
  const filterItem = document.querySelector('[data-item="filter"]');
  const filterIcon = filterItem.querySelector(".nav-icon");
  const filterModal = document.getElementById("filterModal");
  const closeFilterBtn = document.getElementById("closeFilterBtn");
  const addFilterBtn = document.getElementById("addFilterBtn");
  const collapseFilterBtn = document.getElementById("collapseFilterBtn");
  const collapseIcon = document.getElementById("collapseIcon");
  const filterContent = document.getElementById("filterContent");

  // Handle geofence modal
  const geofenceItem = document.querySelector('[data-item="geofence"]');
  const geofenceIcon = geofenceItem.querySelector(".nav-icon");
  const geofenceModal = document.getElementById("geofenceModal");
  const geofenceDetailModal = document.getElementById("geofenceDetailModal");
  const closeGeofenceBtn = document.getElementById("closeGeofenceBtn");
  const closeGeofenceDetailBtn = document.getElementById(
    "closeGeofenceDetailBtn"
  );
  const addGeofenceBtn = document.getElementById("addGeofenceBtn");
  const collapseGeofenceBtn = document.getElementById("collapseGeofenceBtn");
  const geofenceCollapseIcon = document.getElementById("geofenceCollapseIcon");
  const geofenceContent = document.getElementById("geofenceContent");
  const collapseGeofenceDetailBtn = document.getElementById(
    "collapseGeofenceDetailBtn"
  );
  const geofenceDetailCollapseIcon = document.getElementById(
    "geofenceDetailCollapseIcon"
  );
  const geofenceDetailContent = document.getElementById(
    "geofenceDetailContent"
  );

  // Handle bookmark modal
  const bookmarkItem = document.querySelector('[data-item="bookmark"]');
  const bookmarkIcon = bookmarkItem.querySelector(".nav-icon");
  const bookmarkModal = document.getElementById("bookmarkModal");
  const bookmarkDetailModal = document.getElementById("bookmarkDetailModal");
  const closeBookmarkBtn = document.getElementById("closeBookmarkBtn");
  const closeBookmarkDetailBtn = document.getElementById(
    "closeBookmarkDetailBtn"
  );
  const addBookmarkBtn = document.getElementById("addBookmarkBtn");
  const collapseBookmarkBtn = document.getElementById("collapseBookmarkBtn");
  const bookmarkCollapseIcon = document.getElementById("bookmarkCollapseIcon");
  const bookmarkContent = document.getElementById("bookmarkContent");
  const collapseBookmarkDetailBtn = document.getElementById(
    "collapseBookmarkDetailBtn"
  );
  const bookmarkDetailCollapseIcon = document.getElementById(
    "bookmarkDetailCollapseIcon"
  );
  const bookmarkDetailContent = document.getElementById(
    "bookmarkDetailContent"
  );

  // Handle Profile Modal

  // Element references
  const profileItem = document.querySelector('[data-item="profile"]');
  const profileIcon = profileItem.querySelector(".nav-icon");
  const profileModal = document.getElementById("profileModal");
  const closeProfileBtn = document.getElementById("closeProfileBtn");
  const collapseProfileBtn = document.getElementById("collapseProfileBtn");
  const profileCollapseIcon = document.getElementById("profileCollapseIcon");
  const profileForm = document.getElementById("profileContent");
  const profileCancelBtn = document.querySelector(".profile-btn-cancel");
  const profileSubmitBtn = document.querySelector(".profile-btn-submit");

  // Show profile modal
  function showProfileModal() {
    closeAllActiveModals();

    profileModal.classList.add("visible");
    activeModal = profileModal;

    profileContent.classList.remove("hidden");
    profileCollapseIcon.classList.remove("rotated");
    profileModal.classList.remove("collapsed");
    profileModal.style.height = "auto";

    positioning(profileItem, profileModal);
  }

  // Hide profile modal
  function hideProfileModal() {
    profileModal.classList.remove("visible");
    activeModal = null;
  }

  // Handle submit form
  function handleProfileSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const formData = {
      firstname: profileForm.firstname.value.trim(),
      lastname: profileForm.lastname.value.trim(),
      username: profileForm.username.value.trim(),
      email: profileForm.email.value.trim(),
      password: profileForm.password.value.trim(),
      confirmPassword: profileForm.confirmPassword.value.trim(),
      activeUntil: profileForm.activeUntil.value,
      phone: profileForm.phone.value.trim(),
    };

    // Validation
    if (Object.values(formData).some((value) => !value)) {
      alert("Semua field harus diisi!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Password dan Confirm Password harus sama!");
      return;
    }

    console.log("Profile submitted:", formData);

    hideProfileModal();
  }

  // Expand menu and show modal
  profileIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
    }
  });

  // Click profile item
  profileItem.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
      setTimeout(showProfileModal, 300);
    } else {
      if (profileModal.classList.contains("visible")) {
        hideProfileModal();
      } else {
        showProfileModal();
      }
    }
  });

  // Close and Cancel
  closeProfileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    hideProfileModal();
  });

  profileCancelBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    hideProfileModal();
  });

  // Submit form
  profileForm.addEventListener("submit", handleProfileSubmit);

  // Prevent modal from closing when clicking inside inputs
  profileModal.addEventListener("click", (e) => e.stopPropagation());

  document.querySelectorAll("#profileModal input").forEach((input) => {
    ["click", "focus", "input"].forEach((eventType) => {
      input.addEventListener(eventType, (e) => e.stopPropagation());
    });
  });

  // Update position on resize
  window.addEventListener("resize", () => {
    if (profileModal.classList.contains("visible")) {
      positioning(profileItem, profileModal);
    }
  });

  // Close profile modal if other nav item clicked
  document.querySelectorAll(".nav-item").forEach((item) => {
    if (item.getAttribute("data-item") !== "profile") {
      item.addEventListener("click", () => {
        if (profileModal.classList.contains("visible")) {
          hideProfileModal();
        }
      });
    }
  });

  // Setup collapse functionality
  setupCollapseFunction(
    collapseProfileBtn,
    profileModal,
    profileContent,
    profileCollapseIcon
  );

  // Fungsi untuk menampilkan Profile Modal Handler

  // Fungsi untuk menampilkan geofence modal
  function showGeofenceModal() {
    // Tutup semua modal yang terbuka
    document
      .querySelectorAll(
        ".control-modal, .filter-modal, .geofence-modal, .geofence-detail-modal, .bookmark-modal, .bookmark-detail-modal, .enc-modal, .anchored-vessel-modal, .profile-modal"
      )
      .forEach((modal) => {
        modal.classList.remove("visible");
      });

    geofenceModal.classList.add("visible");
    activeModal = geofenceModal;

    // Update posisi modal relatif terhadap menu item
    const geofenceItemRect = geofenceItem.getBoundingClientRect();
    geofenceModal.style.top = `${geofenceItemRect.top}px`;
    geofenceModal.style.left = `${geofenceItemRect.right + 10}px`;
  }

  // Event listener untuk icon geofence (hanya untuk expand)
  geofenceIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
    }
  });

  // Event listener untuk item geofence (untuk menampilkan popup)
  geofenceItem.addEventListener("click", function (e) {
    e.stopPropagation();

    // Tutup modal filter jika terbuka
    filterModal.classList.remove("visible");

    // Tambahkan class expanded ke menu jika belum ada
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
      // Tunggu transisi selesai sebelum menampilkan modal
      setTimeout(showGeofenceModal, 300);
    } else {
      // Toggle visibility geofence modal
      if (
        geofenceModal.classList.contains("visible") ||
        geofenceDetailModal.classList.contains("visible")
      ) {
        geofenceModal.classList.remove("visible");
        geofenceDetailModal.classList.remove("visible");
        activeModal = null;
      } else {
        showGeofenceModal();
      }
    }
  });

  // Event listener untuk tombol close geofence
  closeGeofenceBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    geofenceModal.classList.remove("visible");
    activeModal = null;
  });

  // Event listener untuk tombol close geofence detail
  closeGeofenceDetailBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    geofenceDetailModal.classList.remove("visible");
    activeModal = null;
  });

  // Event listener untuk tombol add geofence
  addGeofenceBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    // Sembunyikan geofence modal saat detail modal ditampilkan
    geofenceModal.classList.remove("visible");
    geofenceDetailModal.classList.add("visible");

    // Gunakan fungsi positioning untuk meletakkan modal detail
    positioning(geofenceItem, geofenceDetailModal);
  });

  // Event listener untuk tombol edit geofence
  document.querySelectorAll('.geofence-btn[title="View"]').forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();

      // Sembunyikan geofence modal dan tampilkan detail modal
      geofenceModal.classList.remove("visible");

      // Set posisi geofence detail modal
      const geofenceItemRect = geofenceItem.getBoundingClientRect();
      geofenceDetailModal.style.top = `${geofenceItemRect.top}px`;
      geofenceDetailModal.style.left = `${geofenceItemRect.right + 10}px`;

      geofenceDetailModal.classList.add("visible");
      activeModal = geofenceDetailModal;
    });
  });

  // Event listener untuk tombol cancel pada detail
  document
    .querySelector(".geofence-action-btn.btn-cancel")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      geofenceDetailModal.classList.remove("visible");
      showGeofenceModal();
    });

  // Event listener untuk tombol collapse filter
  collapseFilterBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (filterContent.classList.contains("hidden")) {
      filterContent.classList.remove("hidden");
      collapseIcon.classList.remove("rotated");
    } else {
      filterContent.classList.add("hidden");
      collapseIcon.classList.add("rotated");
    }
  });

  // Event listener untuk icon filter (hanya untuk expand)
  filterIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
    }
  });

  // Event listener untuk text filter (untuk menampilkan popup)
  filterItem.addEventListener("click", function (e) {
    e.stopPropagation();

    // Tutup modal geofence jika terbuka
    geofenceModal.classList.remove("visible");
    geofenceDetailModal.classList.remove("visible");
    bookmarkModal.classList.remove("visible");
    bookmarkDetailModal.classList.remove("visible");
    encModal.classList.remove("visible");

    // Tambahkan class expanded ke menu jika belum ada
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
      // Tunggu transisi selesai sebelum menampilkan modal
      setTimeout(showFilterModal, 300);
    } else {
      showFilterModal();
    }
  });

  // Event listener untuk tombol collapse geofence detail
  collapseGeofenceDetailBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    geofenceDetailModal.classList.toggle("collapsed");
    geofenceDetailCollapseIcon.classList.toggle("rotated");

    // Juga toggle visibility content
    if (geofenceDetailModal.classList.contains("collapsed")) {
      geofenceDetailContent.style.display = "none";
    } else {
      geofenceDetailContent.style.display = "block";
    }
  });

  // Fungsi untuk menampilkan filter modal
  function showFilterModal() {
    // Tutup semua modal yang terbuka
    document
      .querySelectorAll(
        ".control-modal, .filter-modal, .antena-modal, .geofence-modal, .geofence-detail-modal, .station-modal,  .bookmark-modal, .bookmark-detail-modal,  .anomaly-modal, .enc-modal, .anchored-vessel-modal, .profile-modal, .logout-modal"
      )
      .forEach((modal) => {
        modal.classList.remove("visible");
      });

    filterModal.classList.add("visible");
    activeModal = filterModal;

    // Update posisi modal relatif terhadap menu item
    const filterItemRect = filterItem.getBoundingClientRect();
    filterModal.style.top = `${filterItemRect.top}px`;
    filterModal.style.left = `${filterItemRect.right + 10}px`;
  }

  // Event listener untuk tombol close filter
  closeFilterBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    filterModal.classList.remove("visible");
    activeModal = null;
  });

  // Event listener untuk tombol add filter
  addFilterBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    const newRow = document.createElement("div");
    newRow.className = "filter-row";
    newRow.innerHTML = `
            <div class="filter-group">
              <select class="filter-select condition-select">
                <option>AND</option>
                <option>OR</option>
              </select>
              <select class="filter-select type-select">
                <option>Type</option>
                <option>Vessel Type</option>
                <option>Flag</option>
                <option>Name</option>
              </select>
              <select class="filter-select operator-select">
                <option>=</option>
                <option>></option>
                <option><</option>
                <option>!=</option>
              </select>
              <select class="filter-select value-select">
                <option>Anti-Pollution</option>
                <option>Fishing Vessel</option>
                <option>Cargo</option>
                <option>Passenger</option>
              </select>
            </div>
            <button class="filter-delete">
              <i class="bi bi-trash"></i>
            </button>
          `;
    document.querySelector(".filter-content").appendChild(newRow);

    // Tambahkan event listener ke dropdown baru
    const selects = newRow.querySelectorAll(".filter-select");
    selects.forEach((select) => {
      select.addEventListener("click", function (e) {
        e.stopPropagation();
      });
      select.addEventListener("change", function (e) {
        e.stopPropagation();
      });
    });

    // Tambahkan event listener ke tombol delete baru
    const deleteBtn = newRow.querySelector(".filter-delete");
    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      newRow.remove();
    });
  });

  // Handle delete filter row - tambahkan event listener langsung ke tombol delete
  document.querySelectorAll(".filter-delete").forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const row = this.closest(".filter-row");
      if (
        !row.isEqualNode(
          document.querySelector(".filter-content").firstElementChild
        )
      ) {
        row.remove();
      }
    });
  });

  // Tetapkan sebuah fungsi untuk menangani dropdown yang dirender saat page load
  function setupInitialDropdowns() {
    document.querySelectorAll(".filter-select").forEach((select) => {
      select.addEventListener("click", function (e) {
        e.stopPropagation();
      });
      select.addEventListener("change", function (e) {
        e.stopPropagation();
      });
    });
  }

  // Panggil langsung untuk dropdown yang sudah ada
  setupInitialDropdowns();

  // Update posisi filter modal saat window di-resize
  window.addEventListener("resize", function () {
    if (filterModal.classList.contains("visible")) {
      const filterItemRect = filterItem.getBoundingClientRect();
      filterModal.style.top = `${filterItemRect.top}px`;
      filterModal.style.left = `${filterItemRect.right + 10}px`;
    }
  });

  // Close filter modal when clicking outside
  document.addEventListener("click", function (e) {
    if (
      activeModal &&
      !e.target.closest(".filter-modal") &&
      !e.target.closest('[data-item="filter"]') &&
      !e.target.closest(".filter-select") &&
      !e.target.closest(".filter-delete") &&
      !e.target.closest(".geofence-modal") &&
      !e.target.closest(".geofence-detail-modal") &&
      !e.target.closest('[data-item="geofence"]')
    ) {
      activeModal.classList.remove("visible");
      activeModal = null;
    }
  });

  // Toggle menu visibility and hamburger/X icon when hamburger is clicked
  hamburgerBtn.addEventListener("click", function () {
    // Two-step closing process
    if (menuState === "expanded") {
      // First click: collapse the expanded menu
      navMenu.classList.remove("expanded");
      menuState = "open";
    } else if (menuState === "open") {
      // Second click: close the menu completely
      this.classList.remove("active");
      navMenu.classList.remove("visible");
      menuState = "closed";
    } else {
      // Menu is closed, open it
      this.classList.add("active");
      navMenu.classList.add("visible");
      menuState = "open";
    }
  });

  // Control modal toggles
  mapControlBtn.addEventListener("click", function () {
    // Close other modals
    layerModal.classList.remove("visible");
    navigationModal.classList.remove("visible");

    // Toggle map modal
    mapModal.classList.toggle("visible");
  });

  infoControlBtn.addEventListener("click", function () {
    // Close other modals
    mapModal.classList.remove("visible");
    navigationModal.classList.remove("visible");

    // Toggle layer modal
    layerModal.classList.toggle("visible");
  });

  navControlBtn.addEventListener("click", function () {
    // Close other modals
    mapModal.classList.remove("visible");
    layerModal.classList.remove("visible");

    // Toggle navigation modal
    navigationModal.classList.toggle("visible");
  });

  // Close modals when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".control-btn") &&
      !e.target.closest(".control-modal")
    ) {
      mapModal.classList.remove("visible");
      layerModal.classList.remove("visible");
      navigationModal.classList.remove("visible");
    }
  });

  // Update menu position on window resize
  window.addEventListener("resize", function () {
    const updatedRect = hamburgerContainer.getBoundingClientRect();
    navMenu.style.top = updatedRect.bottom + 5 + "px";
    navMenu.style.left = updatedRect.left + "px";
  });

  // Event listener untuk tombol collapse geofence
  collapseGeofenceBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (geofenceContent.classList.contains("hidden")) {
      geofenceContent.classList.remove("hidden");
      geofenceCollapseIcon.classList.remove("rotated");
    } else {
      geofenceContent.classList.add("hidden");
      geofenceCollapseIcon.classList.add("rotated");
    }
  });

  // Fungsi untuk mencegah event input dan textarea keluar dari popup
  function preventPopupClose() {
    // Tambahkan event listener ke semua input di modal geofence detail
    document
      .querySelectorAll(
        "#geofenceDetailModal input, #geofenceDetailModal textarea"
      )
      .forEach((input) => {
        input.addEventListener("click", function (e) {
          e.stopPropagation();
        });

        input.addEventListener("focus", function (e) {
          e.stopPropagation();
        });

        input.addEventListener("input", function (e) {
          e.stopPropagation();
        });
      });
  }

  // Panggil fungsi untuk setup event listener pada input
  preventPopupClose();

  // Event listener untuk tombol collapse geofence detail
  collapseGeofenceDetailBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (geofenceDetailContent.classList.contains("hidden")) {
      geofenceDetailContent.classList.remove("hidden");
      geofenceDetailCollapseIcon.classList.remove("rotated");
    } else {
      geofenceDetailContent.classList.add("hidden");
      geofenceDetailCollapseIcon.classList.add("rotated");
    }
  });

  // Fungsi untuk menampilkan geofence modal
  geofenceItem.addEventListener("click", function () {
    geofenceModal.classList.add("visible");
    positioning(geofenceItem, geofenceModal);
  });

  // Fungsi untuk menampilkan detail geofence saat tombol "+" diklik
  addGeofenceBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    // Sembunyikan geofence modal saat detail modal ditampilkan
    geofenceModal.classList.remove("visible");
    geofenceDetailModal.classList.add("visible");

    // Gunakan fungsi positioning untuk meletakkan modal detail
    positioning(geofenceItem, geofenceDetailModal);
  });

  // Fungsi untuk menutup modal geofence
  closeGeofenceBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    geofenceModal.classList.remove("visible");
  });

  // Fungsi untuk menutup modal detail geofence
  closeGeofenceDetailBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    geofenceDetailModal.classList.remove("visible");
  });

  // Event listener untuk tombol delete pada geofence item
  document.querySelectorAll(".geofence-btn.btn-danger").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      // Hapus baris item yang berisi tombol ini
      const geofenceItem = this.closest(".geofence-item");
      if (geofenceItem) {
        geofenceItem.remove();
      }
    });
  });

  // Fungsi untuk menampilkan bookmark modal
  function showBookmarkModal() {
    // Tutup semua modal yang terbuka
    document
      .querySelectorAll(
        ".control-modal, .filter-modal, .antena-modal, .geofence-modal, .geofence-detail-modal, .station-modal,  .bookmark-modal, .bookmark-detail-modal,  .anomaly-modal, .enc-modal, .anchored-vessel-modal, .profile-modal, .logout-modal"
      )
      .forEach((modal) => {
        modal.classList.remove("visible");
      });

    bookmarkModal.classList.add("visible");
    activeModal = bookmarkModal;

    // Update posisi modal relatif terhadap menu item
    const bookmarkItemRect = bookmarkItem.getBoundingClientRect();
    bookmarkModal.style.top = `${bookmarkItemRect.top}px`;
    bookmarkModal.style.left = `${bookmarkItemRect.right + 10}px`;
  }

  // Event listener untuk icon bookmark (hanya untuk expand)
  bookmarkIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
    }
  });

  // Event listener untuk item bookmark (untuk menampilkan popup)
  bookmarkItem.addEventListener("click", function (e) {
    e.stopPropagation();

    // Tutup modal filter dan geofence jika terbuka
    filterModal.classList.remove("visible");
    geofenceModal.classList.remove("visible");
    geofenceDetailModal.classList.remove("visible");

    // Tambahkan class expanded ke menu jika belum ada
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
      // Tunggu transisi selesai sebelum menampilkan modal
      setTimeout(showBookmarkModal, 300);
    } else {
      // Toggle visibility bookmark modal
      if (bookmarkModal.classList.contains("visible")) {
        bookmarkModal.classList.remove("visible");
        activeModal = null;
      } else if (bookmarkDetailModal.classList.contains("visible")) {
        bookmarkDetailModal.classList.remove("visible");
        activeModal = null;
      } else {
        showBookmarkModal();
      }
    }
  });

  // Event listener untuk tombol close bookmark
  closeBookmarkBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    bookmarkModal.classList.remove("visible");
    activeModal = null;
  });

  // Event listener untuk tombol close bookmark detail
  closeBookmarkDetailBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    bookmarkDetailModal.classList.remove("visible");
    activeModal = null;
  });

  // Event listener untuk tombol add bookmark
  addBookmarkBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    // Sembunyikan bookmark modal saat detail modal ditampilkan
    bookmarkModal.classList.remove("visible");
    bookmarkDetailModal.classList.add("visible");

    // Gunakan fungsi positioning untuk meletakkan modal detail
    positioning(bookmarkItem, bookmarkDetailModal);

    // Atur fokus pada input nama bookmark
    setTimeout(function () {
      document.getElementById("bookmarkName").focus();
    }, 100);
  });

  // Event listener untuk tombol collapse bookmark
  collapseBookmarkBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (bookmarkContent.classList.contains("hidden")) {
      bookmarkContent.classList.remove("hidden");
      bookmarkCollapseIcon.classList.remove("rotated");
    } else {
      bookmarkContent.classList.add("hidden");
      bookmarkCollapseIcon.classList.add("rotated");
    }
  });

  // Event listener untuk tombol collapse bookmark detail
  collapseBookmarkDetailBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    // Toggle class 'collapsed' pada modal
    bookmarkDetailModal.classList.toggle("collapsed");

    // Toggle class 'rotated' pada ikon chevron
    bookmarkDetailCollapseIcon.classList.toggle("rotated");

    // Toggle visibility content
    if (bookmarkDetailModal.classList.contains("collapsed")) {
      bookmarkDetailContent.style.display = "none";
    } else {
      bookmarkDetailContent.style.display = "block";
    }
  });

  // Event listener untuk tombol delete pada bookmark item
  document.querySelectorAll(".bookmark-btn.btn-danger").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      // Hapus baris item yang berisi tombol ini
      const bookmarkItem = this.closest(".bookmark-item");
      if (bookmarkItem) {
        bookmarkItem.remove();
      }
    });
  });

  // Event listener untuk form cancel button pada bookmark detail
  document
    .querySelector(".bookmark-detail-modal .bookmark-action-btn.btn-cancel")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      bookmarkDetailModal.classList.remove("visible");
      showBookmarkModal();
    });

  // Event listener untuk input pada bookmark detail modal
  document.querySelectorAll("#bookmarkDetailModal input").forEach((input) => {
    input.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    input.addEventListener("focus", function (e) {
      e.stopPropagation();
    });

    input.addEventListener("input", function (e) {
      e.stopPropagation();
    });
  });

  // Fungsi untuk mencegah event input dan textarea keluar dari popup
  preventPopupClose();

  // Handle ENC modal
  const encItem = document.querySelector('[data-item="enc"]');
  const encIcon = encItem.querySelector(".nav-icon");
  const encModal = document.getElementById("encModal");
  const closeEncBtn = document.getElementById("closeEncBtn");
  const collapseEncBtn = document.getElementById("collapseEncBtn");
  const encCollapseIcon = document.getElementById("encCollapseIcon");
  const encContent = document.getElementById("encContent");
  const encTable = document.querySelector(".enc-table");

  // Event listener untuk tombol collapse ENC
  collapseEncBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (
      encContent.classList.contains("hidden") &&
      encTable.classList.contains("hidden")
    ) {
      encContent.classList.remove("hidden");
      encTable.classList.remove("hidden");
      encCollapseIcon.classList.remove("rotated");
    } else {
      encContent.classList.add("hidden");
      encTable.classList.add("hidden");
      encCollapseIcon.classList.add("rotated");
    }
  });

  // Fungsi untuk menampilkan ENC modal
  function showEncModal() {
    // Tutup semua modal yang terbuka
    document
      .querySelectorAll(
        ".control-modal, .filter-modal, .antena-modal, .geofence-modal, .geofence-detail-modal, .station-modal,  .bookmark-modal, .bookmark-detail-modal,  .anomaly-modal, .enc-modal, .anchored-vessel-modal, .profile-modal, .logout-modal"
      )
      .forEach((modal) => {
        modal.classList.remove("visible");
      });

    encModal.classList.add("visible");
    activeModal = encModal;

    // Update posisi modal relatif terhadap menu item
    positioning(encItem, encModal);
  }

  // Event listener untuk icon ENC (hanya untuk expand)
  encIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
    }
  });

  // Event listener untuk item ENC (untuk menampilkan popup)
  encItem.addEventListener("click", function (e) {
    e.stopPropagation();

    // Tutup semua modal yang aktif
    closeAllActiveModals();

    // Tambahkan class expanded ke menu jika belum ada
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
      // Tunggu transisi selesai sebelum menampilkan modal
      setTimeout(showEncModal, 300);
    } else {
      // Toggle visibility ENC modal
      if (encModal.classList.contains("visible")) {
        encModal.classList.remove("visible");
        activeModal = null;
      } else {
        showEncModal();
      }
    }
  });

  // Event listener untuk tombol close ENC
  closeEncBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    encModal.classList.remove("visible");
    activeModal = null;
  });

  // Event listener untuk tombol view di tabel ENC
  document.querySelectorAll(".enc-view-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const row = this.closest("tr");
      const cellId = row.cells[0].textContent;
      const title = row.cells[2].textContent;

      // Tampilkan cell yang dipilih di input active cell
      document.getElementById("encActiveCell").value = cellId + " - " + title;
    });
  });

  // Event listener untuk tombol trash (hapus active cell)
  document
    .querySelector(".enc-trash-btn")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      document.getElementById("encActiveCell").value = "";
    });

  // Tambahkan kode ini setelah event listener untuk trash ENC
  // Event listener untuk input active cell
  document
    .getElementById("encActiveCell")
    .addEventListener("click", function (e) {
      e.stopPropagation();
    });

  document
    .getElementById("encActiveCell")
    .addEventListener("focus", function (e) {
      e.stopPropagation();
    });

  document
    .getElementById("encActiveCell")
    .addEventListener("input", function (e) {
      e.stopPropagation();
    });

  // Event listener untuk input search
  document
    .querySelector(".enc-search input")
    .addEventListener("click", function (e) {
      e.stopPropagation();
    });

  document
    .querySelector(".enc-search input")
    .addEventListener("focus", function (e) {
      e.stopPropagation();
    });

  document
    .querySelector(".enc-search input")
    .addEventListener("input", function (e) {
      e.stopPropagation();
    });

  // Event listener untuk tombol search
  document
    .querySelector(".enc-search-btn")
    .addEventListener("click", function (e) {
      e.stopPropagation();
    });

  // Event listener untuk tombol view di tabel ENC
  document.querySelectorAll(".enc-view-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const row = this.closest("tr");
      const cellId = row.cells[0].textContent;
      const title = row.cells[2].textContent;

      // Tampilkan cell yang dipilih di input active cell
      document.getElementById("encActiveCell").value = cellId + " - " + title;
    });
  });

  // Tambahkan event listener untuk mencegah penutupan modal saat mengklik konten
  encModal.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Handle Antena modal
  const antenaItem = document.querySelector('[data-item="antenna"]');
  const antenaIcon = antenaItem.querySelector(".nav-icon");
  const antenaModal = document.getElementById("antenaModal");
  const closeAntenaBtn = document.getElementById("closeAntenaBtn");
  const antenaAddBtn = document.getElementById("antenaAddBtn");
  const collapseAntenaBtn = document.getElementById("collapseAntenaBtn");
  const antenaCollapseIcon = document.getElementById("antenaCollapseIcon");
  const antenaContent = document.getElementById("antenaContent");
  const antenaEditForm = document.getElementById("antenaEditForm");
  const antenaCancelBtn = document.getElementById("antenaCancelBtn");
  const antenaSubmitBtn = document.getElementById("antenaSubmitBtn");
  const antenaEditBtns = document.querySelectorAll(".antena-edit-btn");
  const antenaEditMode = { isEdit: false, rowIndex: -1 };

  // Event listener untuk icon Antena (hanya untuk expand)
  antenaIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
    }
  });

  // Event listener untuk item Antena (untuk menampilkan popup)
  antenaItem.addEventListener("click", function (e) {
    e.stopPropagation();

    // Tutup semua modal yang aktif
    closeAllActiveModals();

    // Tambahkan class expanded ke menu jika belum ada
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
      // Tunggu transisi selesai sebelum menampilkan modal
      setTimeout(function () {
        showAntenaModal();
      }, 300);
    } else {
      // Toggle visibility antena modal
      if (antenaModal.classList.contains("visible")) {
        antenaModal.classList.remove("visible");
        activeModal = null;
      } else {
        showAntenaModal();
      }
    }
  });

  // Fungsi untuk menampilkan modal antena
  function showAntenaModal() {
    // Sembunyikan form edit
    antenaEditForm.classList.remove("visible");

    // Update posisi modal relatif terhadap menu item
    positioning(antenaItem, antenaModal);

    antenaModal.classList.add("visible");
    activeModal = antenaModal;
  }

  // Fungsi untuk menampilkan form edit dengan data
  function showAntenaEditForm(
    name = "",
    longitude = "",
    latitude = "",
    rowIndex = -1
  ) {
    // Isi form dengan data
    document.getElementById("antenaName").value = name;
    document.getElementById("antenaLongitude").value = longitude;
    document.getElementById("antenaLatitude").value = latitude;

    // Set mode edit
    antenaEditMode.isEdit = rowIndex >= 0;
    antenaEditMode.rowIndex = rowIndex;

    // Tampilkan form edit
    antenaEditForm.classList.add("visible");
  }

  // Event listener untuk tombol close Antena
  closeAntenaBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    antenaModal.classList.remove("visible");
    activeModal = null;
  });

  // Event listener untuk tombol collapse Antena
  collapseAntenaBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (antenaContent.classList.contains("hidden")) {
      antenaContent.classList.remove("hidden");
      antenaCollapseIcon.classList.remove("rotated");
    } else {
      antenaContent.classList.add("hidden");
      antenaCollapseIcon.classList.add("rotated");
    }
  });

  // Event listener untuk tombol Add Antena
  antenaAddBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    showAntenaEditForm();
  });

  // Event listener untuk tombol Cancel form
  antenaCancelBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    antenaEditForm.classList.remove("visible");
  });

  // Event listener untuk tombol Submit form
  antenaSubmitBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    // Ambil nilai dari form
    const name = document.getElementById("antenaName").value;
    const longitude = document.getElementById("antenaLongitude").value;
    const latitude = document.getElementById("antenaLatitude").value;

    // Validasi sederhana
    if (name === "" || longitude === "" || latitude === "") {
      alert("Semua field harus diisi!");
      return;
    }

    // Jika dalam mode edit, update baris yang sudah ada
    if (antenaEditMode.isEdit && antenaEditMode.rowIndex >= 0) {
      const table = document.querySelector(".antena-table tbody");
      const row = table.rows[antenaEditMode.rowIndex];

      row.cells[0].textContent = name;
      row.cells[1].textContent = longitude;
      row.cells[2].textContent = latitude;

      // Update data attributes
      row.setAttribute("data-name", name);
      row.setAttribute("data-longitude", longitude);
      row.setAttribute("data-latitude", latitude);
    } else {
      // Jika mode tambah baru, tambahkan baris baru ke tabel
      const table = document.querySelector(".antena-table tbody");
      const newRow = table.insertRow();

      // Set atribut data
      newRow.setAttribute("data-id", Date.now().toString());
      newRow.setAttribute("data-name", name);
      newRow.setAttribute("data-longitude", longitude);
      newRow.setAttribute("data-latitude", latitude);

      // Tambahkan sel-sel untuk data
      const nameCell = newRow.insertCell(0);
      const longitudeCell = newRow.insertCell(1);
      const latitudeCell = newRow.insertCell(2);
      const actionCell = newRow.insertCell(3);

      // Isi data
      nameCell.textContent = name;
      longitudeCell.textContent = longitude;
      latitudeCell.textContent = latitude;

      // Tambahkan tombol edit
      const actionBtns = document.createElement("div");
      actionBtns.className = "antena-action-btns";
      actionBtns.innerHTML = `
              <button class="antena-edit-btn" title="Edit">
                <i class="bi bi-pencil"></i>
              </button>
            `;
      actionCell.appendChild(actionBtns);

      // Tambahkan event listener untuk tombol edit
      const editBtn = actionBtns.querySelector(".antena-edit-btn");
      addEditButtonListener(editBtn);
    }

    // Sembunyikan form edit
    antenaEditForm.classList.remove("visible");
  });

  // Fungsi untuk menambahkan event listener ke tombol edit
  function addEditButtonListener(button) {
    button.addEventListener("click", function (e) {
      e.stopPropagation();

      // Ambil baris yang berisi tombol ini
      const row = this.closest("tr");

      // Cari indeks baris
      const table = document.querySelector(".antena-table tbody");
      const rowIndex = Array.from(table.rows).indexOf(row);

      // Ambil data dari atribut data
      const name = row.getAttribute("data-name");
      const longitude = row.getAttribute("data-longitude");
      const latitude = row.getAttribute("data-latitude");

      // Tampilkan form edit dengan data
      showAntenaEditForm(name, longitude, latitude, rowIndex);
    });
  }

  // Tambahkan event listener ke semua tombol edit yang ada
  antenaEditBtns.forEach(function (button) {
    addEditButtonListener(button);
  });

  // Event listener untuk stop propagation pada modal
  antenaModal.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Event listener untuk semua input dan tombol di modal antena
  document
    .querySelectorAll(
      ".antena-modal input, .antena-modal button, .antena-modal select"
    )
    .forEach((el) => {
      ["click", "focus", "input", "change"].forEach((eventType) => {
        el.addEventListener(eventType, function (e) {
          e.stopPropagation();
        });
      });
    });

  // Menutup semua modal yang aktif
  function closeAllActiveModals() {
    // Menutup semua modal dengan class tertentu
    document
      .querySelectorAll(
        ".control-modal, .filter-modal, .antena-modal, .geofence-modal, .geofence-detail-modal, .station-modal, .bookmark-modal, .bookmark-detail-modal, .anomaly-modal, .enc-modal, .anchored-vessel-modal, .profile-modal, .logout-modal, #vesselInfo, .search-result-modal, #searchResultModal"
      )
      .forEach((modal) => {
        modal.classList.remove("visible");
      });

    // Khusus untuk anchoredVesselModal yang menggunakan style display
    const anchoredVesselModal = document.querySelector(
      ".anchored-vessel-modal"
    );
    if (anchoredVesselModal) {
      anchoredVesselModal.style.display = "none";
    }

    // Pastikan activeModal di-set ke null untuk menghindari konflik
    activeModal = null;
  }

  // Tambahkan event listener untuk semua item navigasi
  document.querySelectorAll(".nav-item").forEach(function (item) {
    const itemType = item.getAttribute("data-item");

    if (itemType !== "antenna") {
      // Untuk item selain antenna, tambahkan event yang menutup modal antenna
      item.addEventListener("click", function () {
        // Tutup modal antena jika terbuka
        if (antenaModal.classList.contains("visible")) {
          antenaModal.classList.remove("visible");
        }
      });
    }
  });

  // Event listener untuk item ENC yang memperbaiki masalah tampilan modal
  encItem.addEventListener("click", function (e) {
    e.stopPropagation();

    // Tutup semua modal yang aktif
    closeAllActiveModals();

    // Tambahkan class expanded ke menu jika belum ada
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
      // Tunggu transisi selesai sebelum menampilkan modal
      setTimeout(showEncModal, 300);
    } else {
      // Toggle visibility ENC modal
      if (encModal.classList.contains("visible")) {
        encModal.classList.remove("visible");
        activeModal = null;
      } else {
        showEncModal();
      }
    }
  });

  // Pastikan semua item navigasi menutup modal lain saat diklik
  document
    .querySelectorAll(
      '[data-item="geofence"], [data-item="filter"], [data-item="bookmark"], [data-item="control"]'
    )
    .forEach(function (item) {
      item.addEventListener("click", function (e) {
        // Tutup modal antena dan enc
        antenaModal.classList.remove("visible");
        encModal.classList.remove("visible");
      });
    });

  // Station Modal Handler
  const stationItem = document.querySelector('[data-item="station"]');
  const stationIcon = stationItem.querySelector(".nav-icon");
  const stationModal = document.getElementById("stationModal");
  const closeStationBtn = document.getElementById("closeStationBtn");
  const collapseStationBtn = document.getElementById("collapseStationBtn");
  const stationCollapseIcon = document.getElementById("stationCollapseIcon");
  const stationContent = document.getElementById("stationContent");
  const stationEditForm = document.getElementById("stationEditForm");
  const stationCancelBtn = document.getElementById("stationCancelBtn");
  const stationSubmitBtn = document.getElementById("stationSubmitBtn");
  const stationEditBtns = document.querySelectorAll(".station-edit-btn");
  const stationDeleteBtns = document.querySelectorAll(
    ".station-btn.btn-danger"
  );
  const stationAddBtn = document.getElementById("stationAddBtn");
  const stationEditMode = { isEdit: false, rowIndex: -1 };

  // Event listener untuk icon Station (hanya untuk expand)
  stationIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
    }
  });

  // Event listener untuk item Station (untuk menampilkan popup)
  stationItem.addEventListener("click", function (e) {
    e.stopPropagation();

    // Tutup semua modal yang aktif
    closeAllActiveModals();

    // Tambahkan class expanded ke menu jika belum ada
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
      // Tunggu transisi selesai sebelum menampilkan modal
      setTimeout(function () {
        showStationModal();
      }, 300);
    } else {
      // Toggle visibility station modal
      if (stationModal.classList.contains("visible")) {
        stationModal.classList.remove("visible");
        activeModal = null;
      } else {
        showStationModal();
      }
    }
  });

  // Fungsi untuk menampilkan modal station
  function showStationModal() {
    // Sembunyikan form edit
    stationEditForm.classList.remove("visible");

    // Update posisi modal relatif terhadap menu item
    positioning(stationItem, stationModal);

    stationModal.classList.add("visible");
    activeModal = stationModal;
  }

  // Fungsi untuk menampilkan form edit station dengan data
  function showStationEditForm(
    name = "",
    areaType = "",
    maxSpeed = "",
    rowIndex = -1
  ) {
    // Isi form dengan data
    document.getElementById("stationName").value = name;
    document.getElementById("stationAreaType").value = areaType;
    document.getElementById("stationMaxSpeed").value = maxSpeed;

    // Set mode edit
    stationEditMode.isEdit = rowIndex >= 0;
    stationEditMode.rowIndex = rowIndex;

    // Tampilkan form edit
    stationEditForm.classList.add("visible");
  }

  // Event listener untuk tombol close Station
  closeStationBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    stationModal.classList.remove("visible");
    activeModal = null;
  });

  // Event listener untuk tombol collapse Station
  collapseStationBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (stationContent.classList.contains("hidden")) {
      stationContent.classList.remove("hidden");
      stationCollapseIcon.classList.remove("rotated");
    } else {
      stationContent.classList.add("hidden");
      stationCollapseIcon.classList.add("rotated");
    }
  });

  // Event listener untuk tombol add Station
  stationAddBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    // Tampilkan form edit kosong
    showStationEditForm();
  });

  // Event listener untuk tombol Cancel form station
  stationCancelBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    stationEditForm.classList.remove("visible");
  });

  // Event listener untuk tombol Submit form station
  stationSubmitBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    // Ambil nilai dari form
    const name = document.getElementById("stationName").value;
    const areaType = document.getElementById("stationAreaType").value;
    const maxSpeed = document.getElementById("stationMaxSpeed").value;

    // Validasi sederhana
    if (name === "" || areaType === "" || maxSpeed === "") {
      alert("Semua field harus diisi!");
      return;
    }

    // Jika dalam mode edit, update baris yang sudah ada
    if (stationEditMode.isEdit && stationEditMode.rowIndex >= 0) {
      const table = document.querySelector(".station-table tbody");
      const row = table.rows[stationEditMode.rowIndex];

      row.cells[0].textContent = name;
      row.cells[1].textContent = areaType;
      row.cells[2].textContent = maxSpeed;

      // Update data attributes
      row.setAttribute("data-name", name);
      row.setAttribute("data-area-type", areaType);
      row.setAttribute("data-max-speed", maxSpeed);
    } else {
      // Jika mode tambah baru, tambahkan baris baru ke tabel
      const table = document.querySelector(".station-table tbody");
      const newRow = table.insertRow();

      // Set atribut data
      newRow.setAttribute("data-id", Date.now().toString());
      newRow.setAttribute("data-name", name);
      newRow.setAttribute("data-area-type", areaType);
      newRow.setAttribute("data-max-speed", maxSpeed);

      // Tambahkan sel-sel untuk data
      const nameCell = newRow.insertCell(0);
      const areaTypeCell = newRow.insertCell(1);
      const maxSpeedCell = newRow.insertCell(2);
      const actionCell = newRow.insertCell(3);

      // Isi data
      nameCell.textContent = name;
      areaTypeCell.textContent = areaType;
      maxSpeedCell.textContent = maxSpeed;

      // Tambahkan tombol edit dan delete
      const actionBtns = document.createElement("div");
      actionBtns.className = "station-action-btns";
      actionBtns.innerHTML = `
              <button class="station-edit-btn" title="Edit">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="station-btn btn-danger" title="Delete">
                <i class="bi bi-trash-fill"></i>
              </button>
            `;
      actionCell.appendChild(actionBtns);

      // Tambahkan event listener untuk tombol edit dan delete
      const editBtn = actionBtns.querySelector(".station-edit-btn");
      const deleteBtn = actionBtns.querySelector(".station-btn.btn-danger");
      addStationEditButtonListener(editBtn);
      addStationDeleteButtonListener(deleteBtn);
    }

    // Sembunyikan form edit
    stationEditForm.classList.remove("visible");
  });

  // Fungsi untuk menambahkan event listener ke tombol edit station
  function addStationEditButtonListener(button) {
    button.addEventListener("click", function (e) {
      e.stopPropagation();

      // Ambil baris yang berisi tombol ini
      const row = this.closest("tr");

      // Cari indeks baris
      const table = document.querySelector(".station-table tbody");
      const rowIndex = Array.from(table.rows).indexOf(row);

      // Ambil data dari atribut data
      const name = row.getAttribute("data-name");
      const areaType = row.getAttribute("data-area-type");
      const maxSpeed = row.getAttribute("data-max-speed");

      // Tampilkan form edit dengan data
      showStationEditForm(name, areaType, maxSpeed, rowIndex);
    });
  }

  // Fungsi untuk menambahkan event listener ke tombol delete station
  function addStationDeleteButtonListener(button) {
    button.addEventListener("click", function (e) {
      e.stopPropagation();

      // Ambil baris yang berisi tombol ini
      const row = this.closest("tr");

      // Hapus baris
      // if (row && confirm("Yakin ingin menghapus station ini?")) {
      //   row.remove();
      // }
    });
  }

  // Tambahkan event listener ke semua tombol edit station yang ada
  stationEditBtns.forEach(function (button) {
    addStationEditButtonListener(button);
  });

  // Tambahkan event listener ke tombol delete yang sudah ada
  stationDeleteBtns.forEach(function (button) {
    addStationDeleteButtonListener(button);
  });

  // Event listener untuk stop propagation pada modal station
  stationModal.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Event listener untuk semua input dan tombol di modal station
  document
    .querySelectorAll(
      ".station-modal input, .station-modal button, .station-modal select"
    )
    .forEach((el) => {
      ["click", "focus", "input", "change"].forEach((eventType) => {
        el.addEventListener(eventType, function (e) {
          e.stopPropagation();
        });
      });
    });

  function closeAllModals() {
    document
      .querySelectorAll(
        ".control-modal, .filter-modal, .antena-modal, .geofence-modal, .geofence-detail-modal, .station-modal, .bookmark-modal, .bookmark-detail-modal, .anomaly-modal, .enc-modal, .anchored-vessel-modal, .profile-modal, .logout-modal, #vesselInfo, #arrowIcon, .search-result-modal"
      )
      .forEach(function (modal) {
        modal.classList.remove("visible");
        modal.classList.add("hidden");
        // Jika modal pakai style display
        modal.style.display = "none";
      });
    // Khusus anchoredVesselModal
    var anchoredVesselModal = document.getElementById("anchoredVesselModal");
    if (anchoredVesselModal) anchoredVesselModal.style.display = "none";
  }

  // Update navigasi item listener untuk menutup modal station
  document.querySelectorAll(".nav-item").forEach(function (item) {
    const itemType = item.getAttribute("data-item");

    if (
      itemType !== "antenna" &&
      itemType !== "station" &&
      itemType !== "anchored" &&
      itemType !== "anomaly"
    ) {
      // Untuk item selain antenna, station, anchored, dan anomaly, tambahkan event yang menutup modalnya
      item.addEventListener("click", function () {
        if (antenaModal.classList.contains("visible")) {
          antenaModal.classList.remove("visible");
        }
        if (stationModal.classList.contains("visible")) {
          stationModal.classList.remove("visible");
        }
        if (anchoredVesselModal.classList.contains("visible")) {
          anchoredVesselModal.classList.remove("visible");
        }
        if (anomalyModal.classList.contains("visible")) {
          anomalyModal.classList.remove("visible");
        }
      });
    }
  });

  // Pastikan semua modal ditutup saat navigasi lain diklik
  document
    .querySelectorAll(
      '[data-item="geofence"], [data-item="filter"], [data-item="bookmark"], [data-item="control"], [data-item="enc"]'
    )
    .forEach(function (item) {
      item.addEventListener("click", function (e) {
        // Tutup modal antena, station, dan anchored vessel
        antenaModal.classList.remove("visible");
        stationModal.classList.remove("visible");
        anomalyModal.classList.remove("visible");
        if (anchoredVesselModal) {
          anchoredVesselModal.style.display = "none";
        }
      });
    });

  // Event handling untuk Anchored Vessel
  const anchoredItem = document.querySelector('[data-item="anchored"]');
  const anchoredVesselModal = document.getElementById("anchoredVesselModal");
  const closeAnchoredVesselBtn = document.getElementById(
    "closeAnchoredVesselBtn"
  );
  const cancelAnchoredVesselBtn = document.getElementById(
    "cancelAnchoredVesselBtn"
  );
  const collapseAnchoredVesselBtn = document.getElementById(
    "collapseAnchoredVesselBtn"
  );
  const anchoredVesselContent = document.getElementById(
    "anchoredVesselContent"
  );
  const anchoredVesselCollapseIcon = document.getElementById(
    "anchoredVesselCollapseIcon"
  );
  const swapDateBtn = document.querySelector(".swap-date-btn");

  // Event listener untuk item Anchored Vessel (untuk menampilkan popup)
  anchoredItem.addEventListener("click", function (e) {
    e.stopPropagation();

    // Tutup semua modal yang aktif
    closeAllActiveModals();

    // Tambahkan class expanded ke menu jika belum ada
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
      // Tunggu transisi selesai sebelum menampilkan modal
      setTimeout(function () {
        showAnchoredVesselModal();
      }, 300);
    } else {
      // Toggle visibility anchored vessel modal
      if (anchoredVesselModal.style.display === "block") {
        anchoredVesselModal.style.display = "none";
        activeModal = null;
      } else {
        showAnchoredVesselModal();
      }
    }
  });

  // Fungsi untuk menampilkan modal anchored vessel
  function showAnchoredVesselModal() {
    // Update posisi modal relatif terhadap menu item
    positioning(anchoredItem, anchoredVesselModal);

    // Tampilkan modal
    anchoredVesselModal.style.display = "block";

    // Pastikan konten ditampilkan saat modal dibuka
    anchoredVesselContent.classList.remove("hidden");
    anchoredVesselCollapseIcon.classList.remove("rotated");

    activeModal = anchoredVesselModal;
  }

  // Event listener untuk tombol collapse Anchored Vessel
  collapseAnchoredVesselBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    // Toggle collapse content
    if (anchoredVesselContent.classList.contains("hidden")) {
      anchoredVesselContent.classList.remove("hidden");
      anchoredVesselCollapseIcon.classList.remove("rotated");
    } else {
      anchoredVesselContent.classList.add("hidden");
      anchoredVesselCollapseIcon.classList.add("rotated");
    }
  });

  // Event listener untuk tombol close Anchored Vessel
  closeAnchoredVesselBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    anchoredVesselModal.style.display = "none";
    activeModal = null;
  });

  // Event listener untuk tombol cancel Anchored Vessel
  cancelAnchoredVesselBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    anchoredVesselModal.style.display = "none";
    activeModal = null;
  });

  // Event listener untuk tombol swap dates
  swapDateBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    document.getElementById("startDate").value = endDate;
    document.getElementById("endDate").value = startDate;
  });

  // Event listener untuk stop propagation pada modal
  anchoredVesselModal.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Hentikan propagasi pada elemen-elemen dalam modal
  document
    .querySelectorAll(
      ".anchored-vessel-modal select, .anchored-vessel-modal input, .anchored-vessel-modal button"
    )
    .forEach(function (element) {
      element.addEventListener("click", function (e) {
        e.stopPropagation();
      });

      // Khusus untuk select, tambahkan pencegahan lebih banyak
      if (element.tagName === "SELECT") {
        element.addEventListener("mousedown", function (e) {
          e.stopPropagation();
        });
      }
    });

  // Event handling untuk Anomaly
  const anomalyItem = document.querySelector('[data-item="anomaly"]');
  const anomalyIcon = anomalyItem.querySelector(".nav-icon");
  const anomalyModal = document.getElementById("anomalyModal");
  const closeAnomalyBtn = document.getElementById("closeAnomalyBtn");
  const collapseAnomalyBtn = document.getElementById("collapseAnomalyBtn");
  const anomalyContent = document.getElementById("anomalyContent");
  const anomalyCollapseIcon = document.getElementById("anomalyCollapseIcon");
  const anomalyFilterBtns = document.querySelectorAll(".anomaly-filter-btn");
  const mmsiTableContainer = document.getElementById("mmsiTableContainer");
  const imoTableContainer = document.getElementById("imoTableContainer");
  const callsignTableContainer = document.getElementById(
    "callsignTableContainer"
  );

  // Event listener untuk filter buttons pada Anomaly modal
  anomalyFilterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();

      // Hapus class active dari semua button
      anomalyFilterBtns.forEach(function (filterBtn) {
        filterBtn.classList.remove("active");
      });

      // Tambahkan class active ke button yang diklik
      this.classList.add("active");

      // Dapatkan jenis filter dari data attribute
      const filterType = this.getAttribute("data-filter");

      // Sembunyikan semua container tabel
      mmsiTableContainer.classList.add("hidden");
      imoTableContainer.classList.add("hidden");
      callsignTableContainer.classList.add("hidden");

      // Tampilkan container tabel sesuai dengan filter yang dipilih
      if (filterType === "mmsi") {
        mmsiTableContainer.classList.remove("hidden");
      } else if (filterType === "imo") {
        imoTableContainer.classList.remove("hidden");
      } else if (filterType === "callsign") {
        callsignTableContainer.classList.remove("hidden");
      }
    });
  });

  // Event listener untuk icon Anomaly (hanya untuk expand)
  anomalyIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
    }
  });

  // Event listener untuk item Anomaly (untuk menampilkan popup)
  anomalyItem.addEventListener("click", function (e) {
    e.stopPropagation();

    // Tutup semua modal yang aktif
    closeAllActiveModals();

    // Tambahkan class expanded ke menu jika belum ada
    if (!navMenu.classList.contains("expanded")) {
      navMenu.classList.add("expanded");
      menuState = "expanded";
      // Tunggu transisi selesai sebelum menampilkan modal
      setTimeout(function () {
        showAnomalyModal();
      }, 300);
    } else {
      // Toggle visibility anomaly modal
      if (anomalyModal.classList.contains("visible")) {
        anomalyModal.classList.remove("visible");
        activeModal = null;
      } else {
        showAnomalyModal();
      }
    }
  });

  // Fungsi untuk menampilkan modal anomaly
  function showAnomalyModal() {
    // Update posisi modal relatif terhadap menu item
    positioning(anomalyItem, anomalyModal);

    // Tampilkan modal
    anomalyModal.classList.add("visible");

    // Pastikan konten ditampilkan saat modal dibuka
    anomalyContent.classList.remove("hidden");
    anomalyCollapseIcon.classList.remove("rotated");

    activeModal = anomalyModal;
  }

  // Event listener untuk tombol collapse Anomaly
  collapseAnomalyBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    // Toggle collapse content
    if (anomalyContent.classList.contains("hidden")) {
      anomalyContent.classList.remove("hidden");
      anomalyCollapseIcon.classList.remove("rotated");
    } else {
      anomalyContent.classList.add("hidden");
      anomalyCollapseIcon.classList.add("rotated");
    }
  });

  // Event listener untuk tombol close Anomaly
  closeAnomalyBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    anomalyModal.classList.remove("visible");
    activeModal = null;
  });

  // Event listener untuk stop propagation pada modal
  anomalyModal.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Hentikan propagasi pada elemen-elemen dalam modal
  document
    .querySelectorAll(".anomaly-modal input, .anomaly-modal button")
    .forEach(function (element) {
      element.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    });

  // Event listener untuk filter buttons pada Anomaly modal
  anomalyFilterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();

      // Hapus class active dari semua button
      anomalyFilterBtns.forEach(function (filterBtn) {
        filterBtn.classList.remove("active");
      });

      // Tambahkan class active ke button yang diklik
      this.classList.add("active");

      // Dapatkan jenis filter dari data attribute
      const filterType = this.getAttribute("data-filter");

      // Sembunyikan semua container tabel
      mmsiTableContainer.classList.add("hidden");
      imoTableContainer.classList.add("hidden");
      callsignTableContainer.classList.add("hidden");

      // Tampilkan container tabel sesuai dengan filter yang dipilih
      if (filterType === "mmsi") {
        mmsiTableContainer.classList.remove("hidden");
      } else if (filterType === "imo") {
        imoTableContainer.classList.remove("hidden");
      } else if (filterType === "callsign") {
        callsignTableContainer.classList.remove("hidden");
      }
    });
  });

  // ... existing code ...
  // Fungsi umum untuk toggle collapse pada semua modal
  function setupCollapseFunction(collapseBtn, modal, content, collapseIcon) {
    collapseBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      if (content.classList.contains("hidden")) {
        // Expand
        content.classList.remove("hidden");
        collapseIcon.classList.remove("rotated");
        modal.classList.remove("collapsed");
      } else {
        // Collapse
        content.classList.add("hidden");
        collapseIcon.classList.add("rotated");
        modal.classList.add("collapsed");
      }
    });
  }

  // Terapkan fungsi collapse untuk semua modal
  // Filter Modal
  setupCollapseFunction(
    collapseFilterBtn,
    filterModal,
    filterContent,
    document.querySelector("#collapseFilterBtn i")
  );

  // Geofence Modal
  setupCollapseFunction(
    document.getElementById("collapseGeofenceBtn"),
    document.getElementById("geofenceModal"),
    document.getElementById("geofenceContent"),
    document.getElementById("geofenceCollapseIcon")
  );

  // Bookmark Modal
  setupCollapseFunction(
    document.getElementById("collapseBookmarkBtn"),
    document.getElementById("bookmarkModal"),
    document.getElementById("bookmarkContent"),
    document.getElementById("bookmarkCollapseIcon")
  );

  // ENC Modal
  setupCollapseFunction(
    document.getElementById("collapseEncBtn"),
    document.getElementById("encModal"),
    document.getElementById("encContent"),
    document.getElementById("encCollapseIcon")
  );

  // Antena Modal
  setupCollapseFunction(
    collapseAntenaBtn,
    antenaModal,
    antenaContent,
    antenaCollapseIcon
  );

  // Station Modal
  setupCollapseFunction(
    collapseStationBtn,
    stationModal,
    stationContent,
    document.querySelector("#collapseStationBtn i")
  );

  // Anchored Vessel Modal
  setupCollapseFunction(
    collapseAnchoredVesselBtn,
    anchoredVesselModal,
    anchoredVesselContent,
    anchoredVesselCollapseIcon
  );

  // Anomaly Modal
  setupCollapseFunction(
    collapseAnomalyBtn,
    anomalyModal,
    anomalyContent,
    anomalyCollapseIcon
  );

  // ... existing code ...

  // Menambahkan event listener untuk DOMContentLoaded
  window.addEventListener("DOMContentLoaded", function () {
    // Fungsi umum untuk toggle collapse pada semua modal
    function setupCollapseFunction(collapseBtn, modal, content, collapseIcon) {
      // Hapus event listener yang mungkin sudah ada (jika ada)
      collapseBtn.removeEventListener("click", collapseBtn.collapseHandler);

      // Buat handler baru
      collapseBtn.collapseHandler = function (e) {
        e.stopPropagation();

        if (content.classList.contains("hidden")) {
          // Expand
          content.classList.remove("hidden");
          collapseIcon.classList.remove("rotated");
          modal.classList.remove("collapsed");
        } else {
          // Collapse
          content.classList.add("hidden");
          collapseIcon.classList.add("rotated");
          modal.classList.add("collapsed");
        }
      };

      // Tambahkan event listener baru
      collapseBtn.addEventListener("click", collapseBtn.collapseHandler);
    }

    // Inisialisasi semua tombol collapse setelah DOM sepenuhnya dimuat
    try {
      // Filter Modal
      setupCollapseFunction(
        document.getElementById("collapseFilterBtn"),
        document.getElementById("filterModal"),
        document.getElementById("filterContent"),
        document.querySelector("#collapseFilterBtn i")
      );

      // Geofence Modal
      setupCollapseFunction(
        document.getElementById("collapseGeofenceBtn"),
        document.getElementById("geofenceModal"),
        document.getElementById("geofenceContent"),
        document.getElementById("geofenceCollapseIcon")
      );

      // Bookmark Modal
      setupCollapseFunction(
        document.getElementById("collapseBookmarkBtn"),
        document.getElementById("bookmarkModal"),
        document.getElementById("bookmarkContent"),
        document.getElementById("bookmarkCollapseIcon")
      );

      // ENC Modal
      setupCollapseFunction(
        document.getElementById("collapseEncBtn"),
        document.getElementById("encModal"),
        document.getElementById("encContent"),
        document.getElementById("encCollapseIcon")
      );

      // Antena Modal
      setupCollapseFunction(
        document.getElementById("collapseAntenaBtn"),
        document.getElementById("antenaModal"),
        document.getElementById("antenaContent"),
        document.getElementById("antenaCollapseIcon")
      );

      // Station Modal
      setupCollapseFunction(
        document.getElementById("collapseStationBtn"),
        document.getElementById("stationModal"),
        document.getElementById("stationContent"),
        document.querySelector("#collapseStationBtn i")
      );

      // Anchored Vessel Modal
      setupCollapseFunction(
        document.getElementById("collapseAnchoredVesselBtn"),
        document.getElementById("anchoredVesselModal"),
        document.getElementById("anchoredVesselContent"),
        document.getElementById("anchoredVesselCollapseIcon")
      );

      // Anomaly Modal
      setupCollapseFunction(
        document.getElementById("collapseAnomalyBtn"),
        document.getElementById("anomalyModal"),
        document.getElementById("anomalyContent"),
        document.getElementById("anomalyCollapseIcon")
      );

      console.log("Semua handler collapse telah diatur ulang");
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat inisialisasi tombol collapse:",
        error
      );
    }
  });

  // Variabel untuk modal konfirmasi
  const confirmModal = document.getElementById("confirmModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const confirmCancelBtn = document.getElementById("confirmCancelBtn");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  let itemToDelete = null;
  let deleteType = "";

  // Fungsi untuk menampilkan modal konfirmasi
  function showConfirmModal(item, type) {
    itemToDelete = item;
    deleteType = type;
    confirmModal.classList.add("visible");
    modalBackdrop.classList.add("visible");
  }

  // Fungsi untuk menyembunyikan modal konfirmasi
  function hideConfirmModal() {
    confirmModal.classList.remove("visible");
    modalBackdrop.classList.remove("visible");
    itemToDelete = null;
    deleteType = "";
  }

  // Event listener untuk tombol batal pada modal konfirmasi
  confirmCancelBtn.addEventListener("click", function () {
    hideConfirmModal();
  });

  // Event listener untuk tombol hapus pada modal konfirmasi
  confirmDeleteBtn.addEventListener("click", function () {
    if (itemToDelete) {
      if (deleteType === "row") {
        itemToDelete.remove();
      } else if (deleteType === "encActive") {
        document.getElementById("encActiveCell").value = "";
      }
      hideConfirmModal();
    }
  });

  // Event listener untuk tombol delete pada geofence items
  document.querySelectorAll(".geofence-btn.btn-danger").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const geofenceItem = this.closest(".geofence-item");
      if (geofenceItem) {
        showConfirmModal(geofenceItem, "row");
      }
    });
  });

  // Event listener untuk tombol delete pada bookmark items
  document.querySelectorAll(".bookmark-btn.btn-danger").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const bookmarkItem = this.closest(".bookmark-item");
      if (bookmarkItem) {
        showConfirmModal(bookmarkItem, "row");
      }
    });
  });

  // Event listener untuk tombol delete pada antena items
  document.querySelectorAll(".antena-btn.btn-danger").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const row = this.closest("tr");
      if (row) {
        showConfirmModal(row, "row");
      }
    });
  });

  // Event listener untuk tombol delete pada station items
  document.querySelectorAll(".station-btn.btn-danger").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const row = this.closest("tr");
      if (row) {
        showConfirmModal(row, "row");
      }
    });
  });

  // Event listener untuk tombol trash pada filter rows
  document.querySelectorAll(".filter-delete").forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const row = this.closest(".filter-row");
      if (row) {
        row.remove(); // Langsung hapus tanpa konfirmasi
      }
    });
  });

  // Update handler untuk menambahkan event listener ke tombol delete baru
  const filterAddBtn = document.getElementById("addFilterBtn");
  if (filterAddBtn) {
    const originalHandler = filterAddBtn.onclick;
    filterAddBtn.onclick = function (e) {
      if (originalHandler) {
        originalHandler.call(this, e);
      }
      // Add event listener to the delete button
      const deleteButtons = document.querySelectorAll(".filter-delete");
      const newDeleteBtn = deleteButtons[deleteButtons.length - 1];
      if (newDeleteBtn) {
        newDeleteBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          const row = this.closest(".filter-row");
          if (row) {
            row.remove(); // Langsung hapus tanpa konfirmasi
          }
        });
      }
    };
  }

  // Event listener untuk tombol clear pada ENC active cell
  document
    .querySelector(".enc-trash-btn")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      document.getElementById("encActiveCell").value = ""; // Langsung hapus tanpa konfirmasi
    });

  // Implementasi Light/Dark mode
  const lightCheckbox = document.getElementById("light");
  const darkCheckbox = document.getElementById("dark");

  const currentTheme = localStorage.getItem("themeMode") || "dark";
  if (currentTheme === "light") {
    lightCheckbox.checked = true;
    updateMapTheme(false);
  } else {
    darkCheckbox.checked = true;
    updateMapTheme(true);
  }

  // Set default mode (dark)
  let currentMode = localStorage.getItem("themeMode") || "dark";
  if (currentMode === "light") {
    document.body.classList.add("light-mode");
    lightCheckbox.checked = true;
    darkCheckbox.checked = false;
  } else {
    document.body.classList.remove("light-mode");
    darkCheckbox.checked = true;
    lightCheckbox.checked = false;
  }

  // Event listener untuk checkbox light
  lightCheckbox.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("light-mode");
      darkCheckbox.checked = false;
      localStorage.setItem("themeMode", "light");
      // Tambahkan ini:
      map.removeLayer(darkLayer);
      lightLayer.addTo(map);
    } else {
      if (!darkCheckbox.checked) {
        darkCheckbox.checked = true;
        document.body.classList.remove("light-mode");
        localStorage.setItem("themeMode", "dark");
        // Tambahkan ini:
        map.removeLayer(lightLayer);
        darkLayer.addTo(map);
      }
    }
  });

  // Event listener untuk checkbox dark
  darkCheckbox.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.remove("light-mode");
      lightCheckbox.checked = false;
      localStorage.setItem("themeMode", "dark");
      // Tambahkan ini:
      map.removeLayer(lightLayer);
      darkLayer.addTo(map);
    } else {
      if (!lightCheckbox.checked) {
        lightCheckbox.checked = true;
        document.body.classList.add("light-mode");
        localStorage.setItem("themeMode", "light");
        // Tambahkan ini:
        map.removeLayer(darkLayer);
        lightLayer.addTo(map);
      }
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Menambahkan kode untuk menyembunyikan vessel info saat pertama kali tampil
  const vesselInfoContainer = document.getElementById("vesselInfoContainer");
  const vesselInfo = document.getElementById("vesselInfo");

  // Pastikan vesselInfo tersembunyi saat halaman pertama kali dimuat
  if (vesselInfoContainer) {
    vesselInfoContainer.style.display = "none";
  }
  if (vesselInfo) {
    vesselInfo.classList.add("hidden");
  }

  // === Navigation Viewboxes (Grup A) ===
  const navItems = [
    {
      name: "filter",
      trigger: document.querySelector('[data-item="filter"]'),
      viewbox: document.getElementById("filterModal"),
    },
    {
      name: "geofence",
      trigger: document.querySelector('[data-item="geofence"]'),
      viewbox: document.getElementById("geofenceModal"),
    },
    {
      name: "bookmark",
      trigger: document.querySelector('[data-item="bookmark"]'),
      viewbox: document.getElementById("bookmarkModal"),
    },
    {
      name: "enc",
      trigger: document.querySelector('[data-item="enc"]'),
      viewbox: document.getElementById("encModal"),
    },
    {
      name: "antenna",
      trigger: document.querySelector('[data-item="antenna"]'),
      viewbox: document.getElementById("antenaModal"),
    },
    {
      name: "station",
      trigger: document.querySelector('[data-item="station"]'),
      viewbox: document.getElementById("stationModal"),
    },
    {
      name: "anchored",
      trigger: document.querySelector('[data-item="anchored"]'),
      viewbox: document.getElementById("anchoredVesselModal"),
    },
    {
      name: "anomaly",
      trigger: document.querySelector('[data-item="anomaly"]'),
      viewbox: document.getElementById("anomalyModal"),
    },
    {
      name: "profile",
      trigger: document.querySelector('[data-item="profile"]'),
      viewbox: document.getElementById("profileModal"),
    },
    {
      name: "map",
      trigger: document.querySelector('[data-item="map"]'),
      viewbox: document.getElementById("mapModal"),
    },
    {
      name: "navigation",
      trigger: document.querySelector('[data-item="navigation"]'),
      viewbox: document.getElementById("navigationModal"),
    },
    {
      name: "layer",
      trigger: document.querySelector('[data-item="layer"]'),
      viewbox: document.getElementById("layerModal"),
    },
  ];

  let activeViewbox = null;

  function closeAllViewboxes() {
    navItems.forEach(({ viewbox, name }) => {
      if (viewbox) {
        if (name === "anchored") {
          viewbox.style.display = "none";
        } else {
          viewbox.classList.remove("visible");
        }
      }
    });
    activeViewbox = null;
  }

  function positionViewbox(trigger, viewbox) {
    const rect = trigger.getBoundingClientRect();
    viewbox.style.left = `${rect.right + 10}px`;
    viewbox.style.top = `${rect.top}px`;
  }

  navItems.forEach((nav) => {
    if (!nav.trigger || !nav.viewbox) return;
    nav.trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      closeOtherModals();
      if (activeViewbox === nav.viewbox) {
        if (nav.name === "anchored") nav.viewbox.style.display = "none";
        else nav.viewbox.classList.remove("visible");
        activeViewbox = null;
      } else {
        closeAllViewboxes();
        if (nav.name !== "profile") {
          // Hanya item selain profile yang di-**positioning**
          positionViewbox(nav.trigger, nav.viewbox);
        }
        if (nav.name === "anchored") nav.viewbox.style.display = "block";
        else nav.viewbox.classList.add("visible");
        activeViewbox = nav.viewbox;
      }
    });
  });

  // === Search & Vessel Modal (Grup B) ===
  const arrowIcon = document.getElementById("arrowIcon");
  const closeVesselButton = document.querySelector(".close-vessel-info");
  const searchIcon = document.getElementById("mainSearchIcon");
  const searchInput = document.querySelector(".search-input");
  const searchResultModal = document.getElementById("searchResultModal");

  let activeModal = null;

  function closeOtherModals() {
    if (activeModal === vesselInfo) {
      vesselInfo.classList.add("hidden");
      vesselInfoContainer.style.display = "none"; // Pastikan container juga tersembunyi
      activeModal = null;
    }
    if (activeModal === searchResultModal) {
      searchResultModal.classList.add("hidden");
      searchResultModal.classList.remove("active");
      searchResultModal.style.display = "none";
      activeModal = null;
    }
  }

  function openModal(modal) {
    closeAllViewboxes(); // Pastikan grup A tertutup
    closeOtherModals(); // Tutup modal aktif (jika berbeda)

    if (modal === vesselInfo) {
      vesselInfoContainer.style.display = "block"; // Tampilkan container juga
      vesselInfo.classList.remove("hidden");
      activeModal = vesselInfo;
    } else if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("active");
      modal.style.display = "block";
      activeModal = modal;
    }
  }

  if (arrowIcon) {
    arrowIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      if (activeModal === vesselInfo) {
        closeOtherModals();
      } else {
        openModal(vesselInfo);
      }
    });
  }

  if (searchIcon) {
    searchIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      if (activeModal === searchResultModal) {
        closeOtherModals();
      } else {
        openModal(searchResultModal);
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("click", function (e) {
      e.stopPropagation();
      if (activeModal !== searchResultModal) {
        openModal(searchResultModal);
      }
    });
  }

  if (closeVesselButton) {
    closeVesselButton.addEventListener("click", function (e) {
      e.stopPropagation();
      closeOtherModals();
    });
  }

  // Close semua jika klik di luar
  document.addEventListener("click", function (e) {
    if (
      activeModal &&
      !activeModal.contains(e.target) &&
      searchInput &&
      !searchInput.contains(e.target)
    ) {
      closeOtherModals();
    }

    if (
      activeViewbox &&
      ![...navItems.map((i) => i.trigger)].some((trigger) =>
        trigger ? trigger.contains(e.target) : false
      ) &&
      !activeViewbox.contains(e.target)
    ) {
      closeAllViewboxes();
    }
  });
});
