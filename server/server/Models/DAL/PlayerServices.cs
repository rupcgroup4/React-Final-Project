using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace server.Models.DAL
{
    public class PlayerServices
    {
        List<Player> players;



        public PlayerServices()
        {
            players = new List<Player>();

            Player player = new Player("test", "test1", "test@test.com", "1");
            players.Add(player);
        }

        public Player PlayerLogin(string email, string password)
        {

            foreach (Player p in players)
            {
                if (p.Email == email && p.Password == password)
                {
                    return p;
                } 
                else if (p.Email == email)
                {
                    return new Player();
                }
            }

            return null;
        }

        public Player PlayerSignUp(Player player)
        {
            foreach(Player p in players)
            {
                if(p.Email == player.Email)
                {
                    return null;
                }
            }
            players.Add(player);
            return player;
        }

        public Player PlayerGoogleSignUp(Player player)
        {
            foreach (Player p in players)
            {
                if (p.Email == player.Email)
                {
                    return p;
                }
            }
            players.Add(player);
            return player;
        }
    }
}