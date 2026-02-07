// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import '@/App.css' // Removed: Using global styles in Next.js
import {
  UseMutationResult,
  // useQuery,
  UseQueryResult
} from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
// import { PostService } from '@/services/PostService.ts';
import { useFetchPosts, useCreatePost, useDeletePost } from '@/queries/PostQuery';
import { useImmer } from 'use-immer';
import {
  // getTestState,
  useTestState,
  useTestIncreasePopulation,
  useTestRemoveAllBears,
  useTestUpdateBears
} from '@/stores/useTestStore';
// import useCommonStore, {
//   // useCommonState,
//   // useCommonLangValue,
//   // useCommonSpinnerValue,
//   // useCommonTitleValue,
//   // useCommonAccessTokenValue,
//   // useCommonUpdateLang,
//   // useCommonUpdateSpinner,
//   // useCommonUpdateTitle,
//   // useCommonUpdateAccessToken
// } from '@/stores/useCommonStore';
import { useCommonStore } from '@/stores/useCommonStore';
// import useStore from "@/store";

// const queryClient = new QueryClient();

function Home() { // Renamed from App to Home for Next.js pages

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  | States & Variables
  |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  // hook 으로 export 되었기 때문에 변수에 할당해서 사용.
  const testState: number = useTestState();
  const testIncreasePopulation = useTestIncreasePopulation();
  const testRemoveAllBears = useTestRemoveAllBears();
  const testUpdateBears = useTestUpdateBears();

  // zustand persist 확인을 위한 store 호출
  // const lang: string = useCommonState().lang;
  // const spinner: boolean = useCommonState().spinner;
  // const title: string = useCommonState().title;
  // const accessToken: string = useCommonState().accessToken;
  // const updateLang = useCommonState().updateLang;
  // const updateSpinner = useCommonState().updateSpinner;
  // const updateTitle = useCommonState().updateTitle;
  // const updateAccessToken = useCommonState().updateAccessToken;
  const {
    lang,
    spinner,
    title,
    accessToken,
    updateLang,
    updateSpinner,
    updateTitle,
    updateAccessToken
  } = useCommonStore();

  const [
    postsParam,
    // setPostsParam
  ] = useState<any>({} as any);
  const [updateParam, setUpdateParam] = useImmer(0);

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  | Queries
  |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  const { data }: UseQueryResult = useFetchPosts(postsParam);
  const createPost: UseMutationResult = useCreatePost();
  const deletePost: UseMutationResult = useDeletePost();

  // const useSignup = (mutationOptions?: UseMutationCustomOptions) => {
  //   return useMutation({
  //     mutationFn: postSignup,
  //     ...mutationOptions,
  //   });
  // };
  //
  // const signupMutation = useSignup();

  // const {
  //   data,
  //   // error,
  //   // isLoading
  // }: UseQueryResult = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: () => PostService.getPosts(postsParam),
  //   select: (result) => result.data,
  //   // enabled: enabled ?? false,
  // });

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  | Hooks
  |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  useEffect(() => {
    console.log("fetching data >>> ", data);
    // if (postsParam && Object.keys(postsParam).length) {
    //   console.log("fetching data > ", data);
    // }
  }, [data]);

  useEffect(() => {
    if (createPost.isSuccess) {
      console.log("mutate success > ", createPost.data);
    }
  }, [createPost]);

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  | Functions
  |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  // const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   console.log(e.key);
  //   setUpdateParam(parseInt(e.key));
  // };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUpdateParam(parseInt(e.target.value));
  };

  const onClickUpdateStorage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    testUpdateBears(updateParam);

    console.log('====== Before State Changed ======');
    console.log('App >>> onClickUpdate >>> lang', lang);
    console.log('App >>> onClickUpdate >>> spinner', spinner);
    console.log('App >>> onClickUpdate >>> title', title);
    console.log('App >>> onClickUpdate >>> accessToken', accessToken);

    updateLang('en');
    updateSpinner(true);
    updateTitle('Title changed.');
    updateAccessToken('Access Token changed.');

    console.log('====== After State Changed ======');
    console.log('App >>> onClickUpdate >>> lang', lang);
    console.log('App >>> onClickUpdate >>> spinner', spinner);
    console.log('App >>> onClickUpdate >>> title', title);
    console.log('App >>> onClickUpdate >>> accessToken', accessToken);
  };

  const onClickClearStorage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    useCommonStore.persist.clearStorage();
  };

  const onClickCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createPost.mutate(postsParam);
  };

  const onClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deletePost.mutate(101);
  };

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Mark Up
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading posts</p>;

  return (
    <div>
      <h1>{testState} around here...</h1>
      <br></br>
      {/*<input type="number" onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDownInput(e)}></input>*/}
      <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e)}></input>
      <button onClick={() => testIncreasePopulation()}>one up</button>
      <button onClick={() => testRemoveAllBears()}>remove all</button>
      <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClickUpdateStorage(e)}>Update Storage</button>
      <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClickClearStorage(e)}>Clear Storage</button>
      <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClickCreate(e)}>Add Post</button>
      <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClickDelete(e)}>Delete Post</button>
    </div>
  )
}

export default Home