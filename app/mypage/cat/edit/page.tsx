import {FC, Suspense} from 'react';
import Edit from 'features/MyPage/Cat/Edit/Edit';


const Page: FC = () => {
  return <>
  <Suspense fallback={<p>Loading...</p>}>
      <Edit />
  </Suspense>
  </>
}

export default Page