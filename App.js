import React, {useState} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';

const App = () => {
  const [cita, setCitas] = useState([
    {id: '1', paciente: 'React', propietario: 'edison', sintomas: 'no come'},
    {id: '2', paciente: 'Native', propietario: 'perdomo', sintomas: 'fiebre'},
    {id: '3', paciente: 'Redux', propietario: 'jose', sintomas: 'tos'},
  ]);

  const eliminarPaciente = id => {
    setCitas(citasActuales => {
      return citasActuales.filter(cita => cita.id !== id);
    });
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administrador de citas</Text>

      <Formulario />

      <Text style={styles.titulo}>
        {cita.length > 0 ? 'Administra tus citas' : 'No hay citas agrega una'}
      </Text>

      <FlatList
        data={cita}
        renderItem={({item}) => (
          <Cita cita={item} eliminarPaciente={eliminarPaciente} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#aa076b',
    flex: 1,
  },
  titulo: {
    color: '#fff',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
