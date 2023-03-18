using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using server.Models.DAL;

namespace server.Models
{
    public class Player
    {
        string firstName;
        string lastName;
        string email;
        string password;

        public Player() { }

        public Player(string firstName, string lastName, string email, string password)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Email = email;
            this.Password = password;
        }

        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }

        public Player PlayerLogin(string email, string password)
        {
            PlayerServices ps = new PlayerServices();
            return ps.PlayerLogin(email, password);
        }

        public Player PlayerSingUp()
        {
            PlayerServices ps = new PlayerServices();
            return ps.PlayerSignUp(this);
        }
    }
}