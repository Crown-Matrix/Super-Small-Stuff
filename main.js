// JS has no built-in ValueError, so this small subclass mirrors Python's
// exception type/message for anyone who wants to catch it specifically
// (e.g. `err instanceof ValueError` or `err.name === "ValueError"`).
class ValueError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValueError";
  }
}

class Shell {
  constructor(state) {
    this.state = state;
  }
}

class Game {
  constructor(live, blank) {
    this.live = live;
    this.blank = blank;
    this.livesFired = 0;
    this.blanksFired = 0;
    this.current_index = 0;
    // Array.from + a factory fn is important here: it creates `live + blank`
    // independent Shell instances, not `n` copies of the same reference
    // (which is what Array(n).fill(new Shell(null)) would give you).
    this.magazine = Array.from(
      { length: this.live + this.blank },
      () => new Shell(null)
    );
  }

  PhoneCall(index, status) {
    this.magazine[index].state = status;
  }

  current_shell() {
    return this.magazine[this.current_index];
  }

  LiveProbability() {
    let potential_lives = this.live - this.livesFired;
    let potential_blanks = this.blank - this.blanksFired;

    // to consider any past phone calls
    if (this.current_shell().state === "live") {
      return 1.0;
    } else if (this.current_shell().state === "blank") {
      return 0.0;
    }

    // to consider any future phone calls
    // NOTE: .slice(current_index, -1) matches Python's magazine[current_index:-1]
    // exactly, including the fact that it excludes the very last shell in the
    // magazine from consideration. Kept as-is for exact logic parity.
    for (const shell of this.magazine.slice(this.current_index, -1)) {
      const shell_state = shell.state;
      if (shell_state === "live") {
        potential_lives -= 1;
      } else if (shell_state === "blank") {
        potential_blanks -= 1;
      } else {
        continue;
      }
    }

    return potential_lives + potential_blanks > 0
      ? potential_lives / (potential_lives + potential_blanks)
      : "Error";
  }

  nextRound(roundState = null) {
    this.current_shell(); // no-op call, kept to mirror the original exactly

    if (roundState === null && this.current_shell().state === null) {
      throw new ValueError("No round state provided");
    } else if (roundState === null && this.current_shell().state !== null) {
      roundState = this.current_shell().state;
    } else if (
      roundState !== this.current_shell().state &&
      roundState !== null &&
      this.current_shell().state !== null
    ) {
      throw new ValueError("Round state does not match the current shell state");
    }

    if (roundState === "live") {
      this.livesFired += 1;
    } else if (roundState === "blank") {
      this.blanksFired += 1;
    } else {
      throw new ValueError("Invalid round state. Must be 'live' or 'blank'.");
    }

    this.current_index += 1;
  }
}

let this_game = new Game(2,3)

this_game.nextRound('blank')

this_game.PhoneCall(2,'live')

console.log(this_game.LiveProbability())