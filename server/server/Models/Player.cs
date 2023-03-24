using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using server.Models.DAL;

namespace server.Models
{
    public class Player
    {
        string email;
        string password;
        string firstName;
        string lastName;
        

        public Player() { }

        public Player(string email, string password, string firstName, string lastName)
        {
            this.Email = email;
            this.Password = password;
            this.FirstName = firstName;
            this.LastName = lastName;
        }

        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }

        public Player getPlayerByEmail(string email)
        {
            PlayerServices ps = new PlayerServices();
            return ps.getPlayerByEmail(email);
        }

        public Player PlayerSignUp()
        {
            PlayerServices ps = new PlayerServices();
            return ps.PlayerSignUp(this);
        }

    }
}