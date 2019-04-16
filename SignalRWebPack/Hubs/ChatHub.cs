using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRWebPack.Hubs
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(string username, string message)
        {
            await Clients.All.SendAsync("messageReceived", username, message);
        }

        public async Task InProgressMessage(string username)
        {
            string message = $"{username} is writing a message...";
            await Clients.All.SendAsync("messageInProgress", message);
        }
    }
}
