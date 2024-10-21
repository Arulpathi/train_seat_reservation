import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  seats = [];
  numSeats: number;
  bookedSeats = [];

  constructor() {
    this.initializeSeats();
  }

  // Initialize seats layout (11 rows with 7 seats in 10 rows, and 3 seats in the last row)
  initializeSeats() {
    let seatNumber = 1;
    for (let i = 0; i < 11; i++) {
      let row = [];
      let seatsInRow = i < 10 ? 7 : 3; // Last row has only 3 seats
      for (let j = 0; j < seatsInRow; j++) {
        row.push({ number: seatNumber++, booked: false });
      }
      this.seats.push(row);
    }

    // Example: Mark seat numbers 5, 6, and 20 as pre-booked
    this.seats[0][4].booked = true;
    this.seats[0][5].booked = true;
    this.seats[2][5].booked = true;
  }

  // Function to book seats based on user input
  bookSeats(seatsToBook: number) {
    this.bookedSeats = [];
    let seatsFound = false;
    
    // First, try to book in a single row
    for (let row of this.seats) {
      let availableSeatsInRow = row.filter(seat => !seat.booked);
      if (availableSeatsInRow.length >= seatsToBook) {
        for (let i = 0; i < seatsToBook; i++) {
          availableSeatsInRow[i].booked = true;
          this.bookedSeats.push(availableSeatsInRow[i].number);
        }
        seatsFound = true;
        break;
      }
    }

    // If no single row can accommodate, book nearby seats
    if (!seatsFound) {
      this.bookNearbySeats(seatsToBook);
    }

    this.updateSeatGrid();
  }

  // Function to book nearby seats if no single row has enough seats
  bookNearbySeats(seatsToBook: number) {
    let totalAvailableSeats = [];
    for (let row of this.seats) {
      let availableSeatsInRow = row.filter(seat => !seat.booked);
      totalAvailableSeats.push(...availableSeatsInRow);
    }

    // Book the required number of seats from total available seats
    for (let i = 0; i < seatsToBook; i++) {
      totalAvailableSeats[i].booked = true;
      this.bookedSeats.push(totalAvailableSeats[i].number);
    }
  }

  // Function to update the display of seat grid after booking
  updateSeatGrid() {
    // This triggers change detection for the seat grid
    this.seats = [...this.seats];
  }
}
