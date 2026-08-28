const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Set an AFK status')
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('The reason you are going AFK')
                .setRequired(false)),
    async execute(interaction) {
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const client = interaction.client;

        // Initialize global AFK memory structure if it doesn't exist
        if (!client.afkData) client.afkData = new Map();

        // Save status: Keyed by GuildIdUserId or just globally by UserId
        client.afkData.set(`${interaction.guild.id}${interaction.user.id}, {
            reason: reason,
            timestamp: Date.now()
        });

        // Optional: Update nickname to show [AFK]
        try {
            await interaction.member.setNickname([AFK] ${interaction.user.username});
        } catch (err) {
            console.log("Couldn't change nickname due to hierarchy permissions.");
        }

        return interaction.reply({ content: You are now AFK: ${reason}`, ephemeral: true });
    },
};
