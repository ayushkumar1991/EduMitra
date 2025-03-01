const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate A Course Tutorial on Following Detail With field Course Name , Description, Along with Chapter Name, about, Duration: Category: \"Programming', Topic: Python, Level: Basic, Duration: 1 hour , NoOf Chapters:5, in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"Name\": \"Python Fundamentals: A Beginner's Journey\",\n  \"Description\": \"This course is designed to introduce complete beginners to the world of Python programming.  You'll learn the basic syntax, data structures, and fundamental concepts necessary to write simple Python scripts and build a solid foundation for more advanced programming topics. No prior programming experience is required.\",\n  \"Category\": \"Programming\",\n  \"Topic\": \"Python\",\n  \"Level\": \"Basic\",\n  \"Duration\": \"5 hour\",\n  \"NoOfChapters\": 5,\n  \"Chapters\": [\n    {\n      \"ChapterName\": \"Chapter 1: Getting Started with Python\",\n      \"About\": \"This chapter covers the essentials of setting up your Python environment.  We'll explore how to download and install Python, configure a code editor (like VS Code or IDLE), and run your first Python program.  We'll also cover the basic syntax of Python and how to write comments.\",\n      \"Duration\": \"1 hour\",\n      \"Topics\": [\n        \"Installing Python\",\n        \"Setting up a code editor (VS Code, IDLE, etc.)\",\n        \"Writing your first Python program ('Hello, World!')\",\n        \"Understanding basic Python syntax (print statements, comments)\",\n        \"Python Documentation overview\"\n      ]\n    },\n    {\n      \"ChapterName\": \"Chapter 2: Variables, Data Types, and Operators\",\n      \"About\": \"In this chapter, you will learn about different data types in Python like integers, floats, strings, and booleans. We'll cover how to declare and assign variables, and explore various operators for performing arithmetic, comparison, and logical operations.\",\n      \"Duration\": \"1 hour\",\n      \"Topics\": [\n        \"Variables: Declaration and assignment\",\n        \"Data types: Integers, floats, strings, booleans\",\n        \"Arithmetic operators (+, -, *, /, %, //, **)\",\n        \"Comparison operators (==, !=, >, <, >=, <=)\",\n        \"Logical operators (and, or, not)\"\n      ]\n    },\n    {\n      \"Chapter Name\": \"Chapter 3: Control Flow: Making Decisions\",\n      \"About\": \"This chapter introduces control flow statements that allow your program to make decisions.  You'll learn about `if`, `elif`, and `else` statements, and how to use them to execute different blocks of code based on conditions.\",\n      \"Duration\": \"1 hour\",\n      \"Topics\": [\n        \"Conditional statements: `if`, `elif`, `else`\",\n        \"Nested `if` statements\",\n        \"Understanding Boolean logic in conditional statements\",\n        \"Writing programs with conditional branching\"\n      ]\n    },\n    {\n      \"Chapter Name\": \"Chapter 4: Loops: Repeating Tasks\",\n      \"About\": \"This chapter dives into loops, which allow you to repeat blocks of code multiple times. We'll cover `for` loops for iterating over sequences and `while` loops for repeating code based on a condition. We'll also discuss break and continue statements to control loop execution.\",\n      \"Duration\": \"1 hour\",\n      \"Topics\": [\n        \"`for` loops: Iterating over sequences (lists, strings, etc.)\",\n        \"`while` loops: Repeating code based on a condition\",\n        \"`break` and `continue` statements\",\n        \"Looping through range of numbers\",\n        \"Nested loops\"\n      ]\n    },\n    {\n      \"Chapter Name\": \"Chapter 5: Introduction to Data Structures: Lists\",\n      \"About\": \"This chapter introduces a fundamental data structure: lists. You'll learn how to create, access, modify, and iterate over lists. We'll also explore various list methods for common operations like adding, removing, and sorting elements.\",\n      \"Duration\": \"1 hour\",\n      \"Topics\": [\n        \"Creating lists\",\n        \"Accessing list elements (indexing)\",\n        \"Modifying lists (adding, removing, updating elements)\",\n        \"List methods (append, insert, remove, pop, sort, etc.)\",\n        \"Iterating over lists using `for` loops\",\n        \"List Slicing\"\n      ]\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
 