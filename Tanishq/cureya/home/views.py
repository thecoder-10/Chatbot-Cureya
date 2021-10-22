from django.shortcuts import render
from .chatbot import find_solution

def process(request):
    if request.method == "POST":
        data = request.POST.get("msgInput", "0")
        # Execute the ML function get the output
        # solutions = find_solution()  # can take data as argument
        solutions = ""
        return render(request, "index.html", context={"response": solutions})
    return render(request, "index.html")

