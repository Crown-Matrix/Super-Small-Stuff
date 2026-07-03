


"""
I made this python script with the intention of using it as a reference for the javascript version

The javascript version is in main.html, but the python version is being left here as legacy

This file is not a dependency of the main.html & can be safely deleted

But it reminds me of the python games that i started coding with in the past, so its just here.
"""





class Shell:
    def __init__(self, state: None):
        self.state = state



class Game:
    def __init__(self,live: int,blank: int):
        self.live = live
        self.blank = blank
        self.livesFired = 0
        self.blanksFired = 0
        self.current_index = 0
        self.magazine = [Shell(None) for _ in range(self.live + self.blank)]

    def PhoneCall(self, index, status):
        self.magazine[index].state = status

    def current_shell(self) -> Shell:
        return self.magazine[self.current_index]
    
    def LiveProbability(self):
        potential_lives = self.live - self.livesFired
        potential_blanks = self.blank - self.blanksFired

        #to consider any past phone calls
        if (self.current_shell().state == "live"):
            return 1.0
        elif (self.current_shell().state == "blank"):
            return 0.0

        for shell in self.magazine[self.current_index:-1]: #to consider any future phone calls
            shell_state = shell.state
            if shell_state == "live":
                potential_lives -= 1
            elif shell_state == "blank":
                potential_blanks -= 1
            else:
                continue
        return potential_lives / (potential_lives + potential_blanks) if (potential_lives + potential_blanks) > 0 else "Error"
    def nextRound(self,roundState=None):
        self.current_shell()
        if roundState is None and self.current_shell().state is None:
            raise ValueError('No round state provided')
        elif roundState is None and self.current_shell().state is not None:
            roundState = self.current_shell().state
        elif roundState != self.current_shell().state and roundState is not None and self.current_shell().state is not None:
            raise ValueError('Round state does not match the current shell state')

        if roundState == "live":
            self.livesFired += 1
        elif roundState == "blank":
            self.blanksFired += 1
        else:
            raise ValueError("Invalid round state. Must be 'live' or 'blank'.")
        
        self.current_index += 1


def game():
    live = None
    blank = None

    while True:
        try:
            live = int(input("Enter the number of live shells: "))
            blank = int(input("Enter the number of blank shells: "))
            if live < 0 or blank < 0:
                print("Please enter non-negative integers for live and blank shells.")
                continue
            break
        except ValueError:
            print("Invalid input. Please enter integers for live and blank shells.")

    #at this point live and blank have been set to valid integers for the game instance

    game_instance = Game(live, blank)

    #begin REPL console for the game

    #im just gonna do this part in javascript


#game()