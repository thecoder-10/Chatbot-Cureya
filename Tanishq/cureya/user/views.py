from django.shortcuts import render
from django.contrib import messages
from .forms import UserRegisterForm
import pyrebase

config = {
    "apiKey": "AIzaSyAnYpBRzc355TQrxOMsd_bqH33wUbYvFys",
    "authDomain": "cureya-1673d.firebaseapp.com",
    "projectId": "cureya-1673d",
    "databaseURL": "https://cureya-1673d-default-rtdb.firebaseio.com/",
    "storageBucket": "cureya-1673d.appspot.com",
    "messagingSenderId": "174130072969",
    "appId": "1:174130072969:web:11989f1bf4f9ba47272558",
    "measurementId": "G-LKD71SLVX5"
}

firebase = pyrebase.initialize_app(config)
authe = firebase.auth()
database = firebase.database()


def signIn(request):
    return render(request, "login.html")


def postsignIn(request):
    email = request.POST.get("email")
    password = request.POST.get("pass")

    try:
        user = authe.sign_in_with_email_and_password(email, password)
    except:
        message = ["Invalid credentials"]
        return render(request, "login.html", {"messages": message})
    session_id = user["idToken"]
    request.session['uid'] = str(session_id)
    user_info = authe.get_account_info(user['idToken'])["users"]
    if not user_info[0]["emailVerified"]:
        try:
            authe.send_email_verification(user['idToken'])
        except:
            message = ["Click on link to verify email"]
            return render(request, "login.html", {"messages": message})
        return render(request, "email_verify.html")
    return render(request, 'index.html', {"curr_user": user})


def email_verification(request):
    return render(request, "email_verify.html")

def logout(request):
    message = ["Successfully logged out of current session"]
    try:
        del request.session["uid"]
    except:
        pass
    return render(request, 'login.html', {"messages":message})


def signup(request):
    return render(request, 'register.html')


def postsignup(request):
    email = request.POST.get('email')
    password = request.POST.get('pass')
    password2 = request.POST.get("pass-repeat")
    # user = authe.create_user_with_email_and_password(email, password)
    # Redirect to verification of email authe.send_email_verification(login['idToken'])
    try:
        if password != password2:
            message = ["Password fields don't match"]
            return render(request, "register.html", {"messages": message})

        user = authe.create_user_with_email_and_password(email, password)
        message = [f"Account created successfully for {email}, Sign In and verify your email"]
    except:
        message = ["Email already exists or password is too weak"]
        return render(request, 'register.html', {"messages": message})
    return render(request, 'login.html', {"messages": message})

# def register(request):
#     if request.method == "POST":
#         form = UserRegisterForm(request.POST)
#         if form.is_valid():
#             form.save()
#             email = form.cleaned_data.get("email")
#             messages.success(request, f"Account created for {email}")
#     else:
#         form = UserRegisterForm()
#
#     return render(request, "register.html", {"form": form})

