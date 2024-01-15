const cssStyles = `
.passwordPopup {
  position: absolute;
  border: 1px solid rgb(208, 196, 196);
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 7px;
  margin:5px 0;
  width:300px;
  color: #fff;
  z-index: 999;
}

.passwordPopup ul {
  list-style: none;
  padding: 0 20px;
  margin: 0;
}

.passwordPopup li {
  margin: 5px 0;
  padding: 5px 0;
  border-bottom: 1px solid #302c2c;
  cursor: pointer;
  transition: all;
  transition-duration: 0.2s;
}
`;

let styleElement = document.createElement("style");
styleElement.textContent = cssStyles;
document.head.append(styleElement);

//cssStyles end

const emailOrUsernameField =
   document.querySelector('input[type="email"]') ||
   document.querySelector('input[type="text"]');
const passwordField = document.querySelector('input[type="password"]');
const form = document.querySelector("form");

const passwords = [
   {
      website: "http://127.0.0.1:5500/login.html",
      email: "rejensraya@gmail.com",
      password: "123456",
   },
   {
      website: "http://127.0.0.1:5500/login.html",
      email: "johndoe@gmail.com",
      password: "123456",
   },
   {
      website: "https://account.mongodb.com/account/login",
      email: "rejensraya@gmail.com",
      password: "123456",
   },
   {
      website: "https://www.facebook.com/",
      email: "rejensraya@gmail.com",
      password: "123456",
   },
   {
      website: "https://www.facebook.com/",
      email: "rejens933@gmail.com",
      password: "oBgbVJe7PH8zwZF",
   },
];

function fetchPassword() {
   const website = location.href;
   const initial = website.split(".com")[0];
   let password = passwords.filter((p) => p.website.includes(initial));
   return password;
}

const passwordList = fetchPassword();

//while filling the password field
passwordField.addEventListener("focus", () => {
   let listItems = passwordList
      .map((p, index) => `<li data-index="${index}">${p.email}</li>`)
      .join("");

   let html = `<div class='passwordPopup'>
               <ul id="password-list">
                  ${listItems}
               </ul>
            </div>`;

   passwordList.length > 0 &&
      passwordField.insertAdjacentHTML("afterend", html);

   // Add click event listener to each li
   let lis = document.querySelectorAll("#password-list li");
   lis.forEach((li) => {
      li.addEventListener("click", () => {
         // Get the index of the clicked li
         let index = li.dataset.index;

         // Call the clicked function
         autoFill(index);
      });
   });
});

// fills the password and email field
function autoFill(index) {
   // Get the corresponding password
   let password = passwordList[index];

   // Set the values of the email and password fields
   emailOrUsernameField.value = password.email;
   passwordField.value = password.password;

   let popup = document.querySelector(".passwordPopup");
   // Remove the popup element
   setTimeout(() => {
      // Remove the popup element
      if (popup) {
         popup.remove();
      }
   }, 300);
}

//when the password field is blurred
passwordField.addEventListener("blur", () => {
   let popup = document.querySelector(".popup");
   setTimeout(() => {
      // Remove the popup element
      if (popup) {
         popup.remove();
      }
   }, 100);
});

//when the form is submitted
form.addEventListener("submit", () => {
   const password = passwordField.value;
   const email = emailOrUsernameField.value;
   const website = location.href;
   const initial = website.split(".com")[0];
   const passwordObj = {
      website: initial,
      email,
      password,
   };

   //check if the password is already saved
   const isSaved = passwords.some((p) => p.password === password);
   if (!isSaved) {
      passwords.push(passwordObj);
   }
});
