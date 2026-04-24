const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Đang xóa dữ liệu cũ...')
  await prisma.person.deleteMany({})
  
  console.log('Đang tạo dữ liệu mẫu cho họ Trần - Nam Ô 1...')

  // Đời 1
  const ancestor = await prisma.person.create({
    data: {
      fullName: 'Trần Văn Khai',
      otherName: 'Cụ Tổ',
      gender: 'NAM',
      generation: 1,
      bio: 'Người khai cơ lập nghiệp cho dòng họ Trần tại Nam Ô 1.',
      branch: 'Nhánh Chính',
    }
  })

  // Đời 2
  const child1 = await prisma.person.create({
    data: {
      fullName: 'Trần Văn An',
      gender: 'NAM',
      generation: 2,
      branch: 'Nhánh Chính',
      parents: { connect: { id: ancestor.id } }
    }
  })

  const child2 = await prisma.person.create({
    data: {
      fullName: 'Trần Thị Bình',
      gender: 'NỮ',
      generation: 2,
      branch: 'Nhánh Chính',
      parents: { connect: { id: ancestor.id } }
    }
  })

  // Đời 3
  await prisma.person.create({
    data: {
      fullName: 'Trần Văn Công',
      gender: 'NAM',
      generation: 3,
      branch: 'Nhánh Chính',
      parents: { connect: { id: child1.id } }
    }
  })

  await prisma.person.create({
    data: {
      fullName: 'Trần Văn Danh',
      gender: 'NAM',
      generation: 3,
      branch: 'Nhánh Chính',
      parents: { connect: { id: child1.id } }
    }
  })

  // Tạo tài khoản Admin
  console.log('Đang tạo tài khoản Admin...')
  await prisma.user.upsert({
    where: { email: 'admin@tran.com' },
    update: {},
    create: {
      email: 'admin@tran.com',
      password: 'admin', // Trong thực tế hãy đổi mật khẩu an toàn
      name: 'Hội đồng gia tộc',
      role: 'ADMIN'
    }
  })

  console.log('Gieo mầm dữ liệu thành công!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
