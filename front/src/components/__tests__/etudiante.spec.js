import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Etudiant from '../etudiante.vue';

describe('Etudiant.vue', () => {
  it('should add a student when the form is submitted', async () => {
    const wrapper = mount(Etudiant);

    // Set input values
    await wrapper.setData({
      nom: 'Sky',
      prenom: 'Fluffy',
      note: 15
    });

    // Simulate form submission
    await wrapper.find('form').trigger('submit.prevent');

    // Check if the student has been added to the list
    expect(wrapper.vm.etudiants).toHaveLength(1);
    expect(wrapper.vm.etudiants[0]).toEqual({
      id: 1,
      nom: 'Sky',
      prenom: 'Fluffy',
      note: 15
    });

    // Ensure input fields are cleared after submission
    expect(wrapper.vm.nom).toBe('');
    expect(wrapper.vm.prenom).toBe('');
    expect(wrapper.vm.note).toBe('');
  });

  it('should edit a student when the edit button is clicked', async () => {
    const wrapper = mount(Etudiant);

    // Add a student first
    await wrapper.setData({
      nom: 'Sky',
      prenom: 'Fluffy',
      note: 15
    });
    await wrapper.find('form').trigger('submit.prevent');

    // Trigger the edit button for the student added
    await wrapper.find('button:nth-of-type(1)').trigger('click');

    // Check if the edit form is populated with correct data
    expect(wrapper.vm.nom).toBe('Sky');
    expect(wrapper.vm.prenom).toBe('Fluffy');
    expect(wrapper.vm.note).toBe(15);

    // Change the values and submit the form again
    await wrapper.setData({
      nom: 'Sky',
      prenom: 'Fluffy',
      note: 18
    });
    await wrapper.find('form').trigger('submit.prevent');

    // Check if the student data is updated
    expect(wrapper.vm.etudiants[0]).toEqual({
      id: 1,
      nom: 'Sky',
      prenom: 'Fluffy',
      note: 18
    });
  });

  it('should remove a student when the delete button is clicked', async () => {
    const wrapper = mount(Etudiant);

    // Add a student
    await wrapper.setData({
      nom: 'Sky',
      prenom: 'Fluffy',
      note: 15
    });
    await wrapper.find('form').trigger('submit.prevent');

    // Remove the student
    await wrapper.find('button:nth-of-type(2)').trigger('click');

    // Check if the student was removed from the list
    expect(wrapper.vm.etudiants).toHaveLength(0);
  });

  it('should reset form fields after a student is added or edited', async () => {
    const wrapper = mount(Etudiant);

    // Add a student
    await wrapper.setData({
      nom: 'Sky',
      prenom: 'Fluffy',
      note: 15
    });
    await wrapper.find('form').trigger('submit.prevent');

    // Check if form fields are reset
    expect(wrapper.vm.nom).toBe('');
    expect(wrapper.vm.prenom).toBe('');
    expect(wrapper.vm.note).toBe('');

    // Edit the student
    await wrapper.find('button:nth-of-type(1)').trigger('click');
    await wrapper.setData({
      nom: 'Sky',
      prenom: 'Fluffy',
      note: 18
    });
    await wrapper.find('form').trigger('submit.prevent');

    // Check if form fields are reset again after edit
    expect(wrapper.vm.nom).toBe('');
    expect(wrapper.vm.prenom).toBe('');
    expect(wrapper.vm.note).toBe('');
  });
});
