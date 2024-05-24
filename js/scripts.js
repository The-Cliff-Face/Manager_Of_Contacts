const urlBase = 'http://managerofcontacts.xyz/LAMPAPI';
const extension = 'php';


function doLogin()
{
    userId = 0;
    firstName = "";
    lastName = "";
    let login = document.getElementById("contact-username").value;
    let password = document.getElementById("contact-password").value;
    var hash = md5( password );
    document.getElementById("loginResult").innerHTML = "";
    //let tmp = {login:login,password:password};
    var tmp = {login:login,password:hash};
    let jsonPayload = JSON.stringify( tmp );
    
    let url = urlBase + '/Login.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                let jsonObject = JSON.parse( xhr.responseText );
                userId = jsonObject.id;
        
                if( userId < 1 )
                {
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                    document.getElementById("submission-box").addClass("invalid");
                    return;
                }
        
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();
                // change href to the next page
                window.location.href = "contacts.html";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("loginResult").innerHTML = err.message;
    }
}

function goToSignup()
{
    window.location.href = "signup.html";
}

function register()
{
    let username = document.getElementById("contact-username").value;
    let firstname = document.getElementById("contact-firstname").value;
    let lastname = document.getElementById("contact-lastname").value;
    let password = document.getElementById("contact-password").value;
   
    
    if (!signupCheck(username,firstname,lastname,password)) {
        return;
    }
    
    var hash = md5(password);
    
    let tmp = {
            firstName: firstName,
            lastName: lastName,
            login: username,
            password: hash
        };
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase  + "/Signup." + extension;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                let jsonObject = JSON.parse( xhr.responseText );
                userId = jsonObject.id;
                document.getElementById("signUpResult").innerHTML = "Success";
                firstName = jsonObject.firstname;
                lastName = jsonObject.lastname;
                saveCookie();
            }
        }
        xhr.send(jsonPayload);
        
    }
    catch (err)
    {
        document.getElementById("signUpResult").innerHTML = err.message;
    }
    
}


// TODO: finish this function
function signupCheck(username,firstname,lastname,password)
{
    return true;
}
// TODO: finish this function
function preventSQLInjection(field)
{
    return true;
}


function saveCookie()
{
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime()+(minutes*60*1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
    userId = -1;
    let data = document.cookie;
    let splits = data.split(",");
    for(var i = 0; i < splits.length; i++)
    {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if( tokens[0] == "contact-firstname" )
        {
            firstName = tokens[1];
        }
        else if( tokens[0] == "contact-lastname" )
        {
            lastName = tokens[1];
        }
        else if( tokens[0] == "contact-username" )
        {
            userId = parseInt( tokens[1].trim() );
        }
    }
    
    if( userId < 0 )
    {
        window.location.href = "index.html";
    }
    else
    {
//        document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
    }
}