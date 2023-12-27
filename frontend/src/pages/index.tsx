import {MainSearchBar} from '@/components/search/MainSearchBar';
import {useSession} from 'next-auth/react';
import {CategoryFilters} from '@/components/filter/CategoryFilters';
import {StoreList} from '@/components/store/StoreList';

export default function Home() {
  const { data } = useSession()

  return (
    <>
      <MainSearchBar userName={data?.user?.name} />
      <CategoryFilters cols={4} />
      <StoreList />
    </>
  )
}
