from os import system as sys
def clear_output():
    sys("clear")
lives_left = 6
correct_indexes = []
guessed_letters = []
a = 0
known_word = []
print ("Hangman Game")
print ("----------------------------------------------------------")
print("Rules for word choice include:")
print ("    •Only letter characters")
print ("    •Word Length is at least 4") 
print ("    •Not Case Sensitive(unlike an insecure detective)")
print ("----------------------------------------------------------")
def rulechecker(x,y): #y is minimum length of word
    global a
    a = 0
    rules = {
        x.isalpha():True,
        len(x)>=y:True,
    }
    for i,v in rules.items():
        if i == v:
            a += 1
        else:
            a -= 1
while True:
    answer = input("Player 1, type in a word for player 2 to guess: ")
    answer = answer.lower()
    backup_answer = answer
    answer = list(answer)
    rulechecker("".join(answer),4)
    if a>=1:
        break
    else:
        print ("not all requirements have been met")
    print ("\n")
for i in answer:
    known_word.append("_")
clear_output()
print ("\n\n")
print (" ".join(known_word))
#SOLUTION WORD READY
game_over = False
while game_over == False:
    correct_index_amount = len(correct_indexes) #to detect any new matches
    letter_matches = []
    #guessing round repeater
    while game_over == False:
        print("\n")#guess maker
        guess = input("Player 2, guess a letter: ")
        if guess.isalpha() and len(guess) == 1:
            if guess in guessed_letters:
                print ("you've already guessed this letter")
            else:
                guessed_letters.append(guess)
                break
    for i in answer:
        while True:
            try:
                if i == guess and answer.index(i) not in correct_indexes:
                    index = int(answer.index(i))    
                    correct_indexes.append(index)
                    known_word[index] = guess
                    answer[index] = "_"
                else:
                    break
            except ValueError:
                break
    clear_output()
    print ("\n")
    if len(correct_indexes) == correct_index_amount:
        if lives_left == 1:
            print ("Player 1 wins as Player 2 is out of lives\n")
            print ("\n")
            print ("the answer was",backup_answer)
            game_over = True
        if lives_left != 1:
            lives_left -= 1
            print ("Wrong, you only have",lives_left,"lives left")
    elif  "_" not in known_word:
        game_over = True
        print ("Player 2 wins with",lives_left,"lives left")
    if "_" in known_word:
        print (" ".join(known_word))
    else:
        p = "".join(known_word)
        print ("The answer was",backup_answer)
