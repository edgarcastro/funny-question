import {
  collection,
  addDoc,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { QuestionType } from '../utils/types';

export const createQuestion = async (data: QuestionType): Promise<string> => {
  const docRef = await addDoc<QuestionType>(
    collection(db, 'questions') as CollectionReference<QuestionType>,
    data
  );
  return docRef.id;
};

export const getQuestion = async (
  referenceId: string
): Promise<QuestionType | undefined> => {
  const docRef = doc(
    db,
    'questions',
    referenceId
  ) as DocumentReference<QuestionType>;
  const querySnapshot = await getDoc<QuestionType>(docRef);
  const data = querySnapshot.data();
  return data;
};
