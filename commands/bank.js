const Discord = require("discord.js");
const config = require(`../config.json`)
const database = require('../database/database')
const moment = require('moment')
moment.locale('PT-BR')

module.exports.run = async (client, message, args, prefix) => {
    message.delete()

    if(!message.member.hasPermission("ADMINISTRATOR")) {
        let embed = new Discord.MessageEmbed()

            .setColor(`RED`)
            .addField(`${config.whitelist.emoji_recusar} | **Ocorreu um erro.**`, "```yaml\nErro: Você não tem permissão para executar este comando!```")
            .setFooter(`Executado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))//Colocando uma footer, um mini texto em baixo da embed
            .setTimestamp();

        return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))
    }

    var id = args[0]
    var quantia = args[1]

    if (!id) {
        let embed = new Discord.MessageEmbed()

            .setColor(`RED`)
            .addField(`${config.whitelist.emoji_recusar} | **Ocorreu um erro.**`, "```yaml\nErro: Você não inseriu o ID!```")
            .setImage(`https://cdn.discordapp.com/attachments/959626622657527809/964604234454667324/logofullstudiobranco.png`)
            .setFooter(`Comando Executado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))//Colocando uma footer, um mini texto em baixo da embed
            .setTimestamp();

        return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))
    }

    if (isNaN(id)) {

        let embed = new Discord.MessageEmbed()

            .setColor(`RED`)
            .addField(`${config.whitelist.emoji_recusar} | **Ocorreu um erro.**`, "```yaml\nErro: Você inseriu um id inválido!```")
            .setFooter(`Executado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))//Colocando uma footer, um mini texto em baixo da embed
            .setTimestamp();

        return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))

    }

    if (!quantia) {
        let embed = new Discord.MessageEmbed()

            .setColor(`RED`)
            .addField(`${config.whitelist.emoji_recusar} | **Ocorreu um erro.**`, "```yaml\nErro: Você não inseriu a quantia!```")
            .setEmoji(`968702394353475605`)
            .setFooter(`Executado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))//Colocando uma footer, um mini texto em baixo da embed
            .setTimestamp();

        return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))
    }

    if (isNaN(quantia)) {

        let embed = new Discord.MessageEmbed()

            .setColor(`RED`)
            .addField(`${config.whitelist.emoji_recusar} | **Ocorreu um erro.**`, "```yaml\nErro: Você inseriu uma quantia inválida, ela deve ser um número!```")
            .setFooter(`Executado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))//Colocando uma footer, um mini texto em baixo da embed
            .setTimestamp();

        return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))

    }

    var find = await database.money.findOne({ where: { user_id: id } })

    if (find) {
        find.bank = quantia
        await find.save().then(a => {
            let embed = new Discord.MessageEmbed()

                .setDescription(`${config.whitelist.emoji_aceitar} | O saldo Bancário do ID **${id}** foi alterado para **${quantia}**`)
                .setColor(`292928`)
                .setFooter(`Executado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))//Colocando uma footer, um mini texto em baixo da embed
                .setTimestamp();

                client.channels.cache.get(config.adm.channellogbank).send(embed);
                return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))
        }).catch(err => {
            let embed = new Discord.MessageEmbed()

                .setColor(`RED`)
                .addField(`${config.whitelist.emoji_recusar} | **Ocorreu um erro.**`, "```yaml\nErro: Olhe console.```")
                .setFooter(`Executado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))//Colocando uma footer, um mini texto em baixo da embed
                .setTimestamp();

            console.log(err)

            return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))
        })
    } else {

        let embed = new Discord.MessageEmbed()

            .setColor(`RED`)
            .addField(`${config.whitelist.emoji_recusar} | **Ocorreu um erro.**`, "```yaml\nErro: O ID " + id + " não existe na DB```")
            .setFooter(`Executado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))//Colocando uma footer, um mini texto em baixo da embed
            .setTimestamp();

        return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))
    }
}

module.exports.config = {
    name: 'bank',
    aliases: ["banco", "money"]
}
/// BY GUSTAVO SILVA, DISCORD:Loadas#0001