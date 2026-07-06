import random

# Step 1: Generate a random number between 1 and 10
secret_number = random.randint(1, 10)

# Step 2: Ask the user to guess
print("I'm thinking of a number between 1 and 10...")

# Step 3: Loop until they guess correctly
while True:
    guess = int(input("Take a guess: "))
    
    if guess == secret_number:
        print("🎉 Correct! You guessed it!")
        break
    elif guess < secret_number:
        print("Too low, try again.")
    else:
        print("Too high, try again.")
