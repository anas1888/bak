let { downloadContentFromMessage } = await import('@whiskeysockets/baileys')

var handler = async (m, { conn }) => {
  if (!/viewOnce/.test(m.quoted?.mtype)) throw '*✳️❇️ اعمل ريبلاي علي رساله للعرض مره واحده*'
  let mtype = Object.keys(m.quoted.message)[0]
  let buffer = await m.quoted.download()
  let caption = m.quoted.message[mtype].caption || ''
  conn.sendMessage(m.chat, { [mtype.replace(/Message/, '')]: buffer, caption }, { quoted: m })
}

handler.help = ['readvo']
handler.tags = ['tools']
handler.command = ['readviewonce', 'read', 'ver', 'افضحها', 'فضح', 'افضح', 'افضحو']

export default handler