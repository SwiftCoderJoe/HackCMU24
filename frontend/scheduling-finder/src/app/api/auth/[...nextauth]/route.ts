import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

const handler = NextAuth({  
    // Configure one or more authentication providers  
    providers: [    
        DiscordProvider({      
            clientId: "1284312985996754995",      
            clientSecret: "cjjRopz-TWhSpoHDIxYOhzbJIrSZIge5",    
        }),    
    ],})

export { handler as GET, handler as POST }