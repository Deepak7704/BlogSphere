const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function migratePasswords() {
  console.log('Starting password migration...')
  
  try {
    // Get all users
    const users = await prisma.user.findMany()
    
    for (const user of users) {
      // Check if password is already hashed (bcrypt hashes start with $2a$, $2b$, or $2y$)
      if (!user.password.startsWith('$2')) {
        console.log(`Hashing password for user: ${user.email}`)
        
        const hashedPassword = await bcrypt.hash(user.password, 12)
        
        await prisma.user.update({
          where: { id: user.id },
          data: { password: hashedPassword }
        })
        
        console.log(`Updated password for: ${user.email}`)
      } else {
        console.log(`Password already hashed for: ${user.email}`)
      }
    }
    
    console.log('Password migration completed!')
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migratePasswords()