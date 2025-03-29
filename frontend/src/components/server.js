const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const sequelize = require('./db');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

sequelize.sync(); // Sincronizar el modelo con la base de datos

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });

    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

app.listen(5000, () => {
  console.log('Servidor ejecutándose en el puerto 5000');
});


