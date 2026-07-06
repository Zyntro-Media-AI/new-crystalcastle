import random

secret_number = random.randint(1, 10)
attempts = 3  # maximum number of guesses

print("I'm thinking of a number between 1 and 10...")
print("You have", attempts, "chances to guess!")

while attempts > 0:
    guess = int(input("Take a guess: "))
    
    if guess == secret_number:
        print("🎉 Correct! You guessed it!")
        break
    elif guess < secret_number:
        print("Too low.")
    else:
        print("Too high.")
    
    attempts -= 1  # reduce attempts by 1
    
    if attempts > 0:
        print("You have", attempts, "chances left.")
    else:
        print("😢 Game over! The number was", secret_number)
