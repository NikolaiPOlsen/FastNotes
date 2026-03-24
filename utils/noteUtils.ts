import { supabase } from './supabase';

export async function deleteNote(id: number, onDelete: () => void) {
    const { error } = await supabase

    .from('Notes')
    .delete()
    .eq('id', id)

    if (error) throw error;
    onDelete();
}

export async function editNote(id: number, newTitle: string, newMessage: string, onEdit: () => void) {
    const { error } = await supabase

    .from('Notes')
    .update({note_title: newTitle, note_message: newMessage,})
    .eq('id', id)

    if (error) throw error;
    onEdit();
}

export async function getData(onlyMine: boolean = true, offset?: number) {
      const { data: { user } } = await supabase.auth.getUser()

      let query = supabase.from('Notes').select('*').order('created_at', { ascending: false })
      if (offset !== undefined) query = query.range(offset, offset + 4)

      if (onlyMine) {
        query = query.eq('user_id', user?.id)
    }
    const { data, error } = await query
    if (error) throw error;
    return data;
  }