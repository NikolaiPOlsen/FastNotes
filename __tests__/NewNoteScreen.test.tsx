import NewNoteScreen from '@/app/(tabs)/newNoteScreen';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

jest.mock('expo-router', () => ({
    router: { replace: jest.fn() }
}));

jest.mock('@/utils/supabase', () => ({
    supabase: {
        from: jest.fn(() => ({
            insert: jest.fn(() => ({ error: null }))
        })),
        auth: {
            getUser: jest.fn(() => ({ data: { user: { id: '123' } } }))
        }
    }
}));

describe('NewNoteScreen', () => {
   it('navigerer til home etter opprettelse', async () => {
    const { getByText, getByPlaceholderText } = render(<NewNoteScreen />);
    
    fireEvent.changeText(getByPlaceholderText('Title'), 'Test tittel');
    fireEvent.changeText(getByPlaceholderText('Note'), 'Test notat');

    await act(async () => {
        fireEvent.press(getByText('Create'));
    });

    await waitFor(() => {
        const { router } = require('expo-router');
        expect(router.replace).toHaveBeenCalledWith('/home');
    });
});
});