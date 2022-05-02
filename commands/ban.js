const Discord = require("discord.js");
const config = require(`../config.json`)
const database = require('../database/database')
const moment = require('moment')
moment.locale('PT-BR')

module.exports.run = async (client, message, args, prefix) => {
    message.delete()

    if(!message.member.hasPermission("ADMINISTRATOR")) {
        let embed = new Discord.MessageEmbed()

            .setColor(`BLACK`)
            .addField(`${config.whitelist.emoji_recusar} | **Ocorreu um erro.**`, "```yaml\nErro: Você não tem permissão para executar este comando!```")
            .setFooter(`Comando executado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))//Colocando uma footer, um mini texto em baixo da embed
            .setTimestamp();

        return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))
    }


    var id = args[0]
    var motivo= args[1]

 


    if (!id) {
        let embed = new Discord.MessageEmbed()

            .setColor(`BLACK`)
            .addField(`${config.whitelist.emoji_recusar} | **Ocorreu um erro.**`, "```yaml\nErro: Você não inseriu o ID!```")
            .setFooter(`Comando executado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))//Colocando uma footer, um mini texto em baixo da embed
            .setTimestamp();

        return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))
    }

    if (isNaN(id)) {

        let embed = new Discord.MessageEmbed()

            .setColor(`BLACK`)
            .addField(`${config.whitelist.emoji_recusar} | **Ocorreu um erro.**`, "```yaml\nErro: Você inseriu um id inválido!```")
            .setFooter(`Comando executado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))//Colocando uma footer, um mini texto em baixo da embed
            .setTimestamp();

        return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))

    }

    if (!motivo) {
        let embed = new Discord.MessageEmbed()

            .setColor(`BLACK`)
            .addField(`${config.whitelist.emoji_recusar} | **Ocorreu um erro.**`, "```yaml\nErro: Você não inseriu o motivo!```")
            .setFooter(`Comando executado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))//Colocando uma footer, um mini texto em baixo da embed
            .setTimestamp();

        return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))
    }



    var find_id = await database.whitelist.findOne({ where: { id: id } })

    if (!find_id) {
        let embed = new Discord.MessageEmbed()

            .setColor(`BLACK`)
            .addField(`${config.whitelist.emoji_recusar} | **Ocorreu um erro.**`, "```yaml\nErro: O ID " + id + " não existe na DB```")
            .setFooter(`Comando executado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))//Colocando uma footer, um mini texto em baixo da embed
            .setTimestamp();

        return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))
    } else {
        find_id.banned = 1
        find_id.save().then(a => {
            let embed = new Discord.MessageEmbed()

                .setDescription(`${config.whitelist.emoji_aceitar} | O ID **${id}** foi banido por **${motivo}**.`)
                .setColor(`292928`)
                .setFooter(`Comando executado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))//Colocando uma footer, um mini texto em baixo da embed
                .setTimestamp();

                client.channels.cache.get(config.adm.channellogban).send(embed);
                return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))
        }).catch(err => {
            let embed = new Discord.MessageEmbed()

                .setColor(`BLACK`)
                .addField(`${config.whitelist.emoji_recusar} | **Ocorreu um erro.**`, "```yaml\nErro: Olhe console.```")
                .setFooter(`Comando executado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))//Colocando uma footer, um mini texto em baixo da embed
                .setTimestamp();

            console.log(err)

            return message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))
        })
    }
    message.delete()
}

module.exports.config = {
    name: 'ban',
    aliases: ["addban"]
}
/// BY GUSTAVO SILVA, DISCORD:Loadas#0001