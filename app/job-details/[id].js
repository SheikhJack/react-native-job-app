import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  specifics,
} from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';
import { useRouter, useSearchParams, Stack } from 'expo-router';

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: params.id,
  });

  // const refresh = () => {}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          hearderStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          haderBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: '',
        }}
      />
      <>
        <ScrollView showsVerticalScrollIndicator={false} 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
           {isLoading ? (
            <ActivityIndicator size="large" color="COLORS.primary"/>
            ) : error ? (
          <Text>Something is wrong</Text>
        ) : data.length === 0 ? (
          <Text>No Data</Text>
        ) : (
          <View style={{padding: SIZES.medium, paddingBottom: 100 }}>
            <Company 
            companyLogo={data[0].employer}
            jobTitle={data[0].title}
            companyName={data[0].employer_name}
            location={data[0].job_country}
            />
            <JobTabs 
            
            />
          </View>
        )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
