const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER ||
  '6281259304458'

export const generateWhatsAppMessage = (
  user,
  result,
  program
) => {
  return `Hi, I would like to ask about the placement test result.

Name: ${user.fullName}
Level: ${result.level}
Score: ${result.score}/100
Recommended Program: ${program?.name || '-'}

I would like to learn more about this program.`
}

export const generateWhatsAppUrl = (
  user,
  result,
  program
) => {
  const message = generateWhatsAppMessage(
    user,
    result,
    program
  )

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`
}