#include <ctime>
#include <cstdlib>
#include <algorithm>
#include <iostream>
#include <fstream>
#include <string>
#include <cstring>
#include <vector>
#include <map>
#include <queue>
#include <unordered_map>
#include <unordered_set>

#include "Post.h"
#include "User.h"
#include "Notification.h"
#include "likeNotification.h"
#include "tagNotification.h"
#include "commentNotification.h"
#include "followNotification.h"
#include "requestNotification.h"


// read the post file, the result is stored at the vector if the post is published by username.
void read_post_file(char *filename, std::string username, std::vector<Post> &vt){
	std::ifstream jsonFile(filename);
	if( !jsonFile.is_open() ){
		exit(1);
	}
	
	std::string line;
	// read each line
	while( std::getline(jsonFile,line) ){
		// parse the line to the node
		Post p;
		p.parse(line);
		
		if( p.get("ownerUsername").compare(username)==0 )
			vt.push_back(p);
	}
	
	jsonFile.close();
}

// read the post file, the result is stored at the vector.
User read_user_file(char *filename, std::string username){
	std::ifstream jsonFile(filename);
	if( !jsonFile.is_open() ){
		exit(1);
	}
	
	std::string line;
	// read each line
	while( std::getline(jsonFile,line) ){
		// parse the line to the node
		User u;
		u.parse(line);
		
		if( u.get("username").compare(username) == 0 ){
			jsonFile.close();
			return u;
		}
	}
	
	jsonFile.close();
	return User();
}

// check whether the post id is published by the username
bool match(std::vector<Post> &vt, std::string id, std::string username){
	for(int i=0; i<(int)vt.size(); i++){
		if( vt[i].get("id").compare(id) == 0 ){
			//std::cout<<id<<" "<<vt[i].get("id")<<" ";
			//std::cout<<username<<" "<<vt[i].get("ownerUsername")<<"\n";
			return vt[i].get("ownerUsername").compare(username)==0;
		}
	}
	return false;
}


// read the event file, and process
// the notification is stored at the vector<Notification>
void read_event_file(char *filename, std::string username, std::vector<Notification> &vt,
	std::vector<Post> &vt_post, User &target_user){
	
	// no notification for the user 
	if( target_user.get("pauseAll") == "true" )
		return;
	
	std::ifstream eventFile(filename);
	if( !eventFile.is_open() ){
		exit(1);
	}
	
	std::string name, event, name_or_id;
	while( eventFile >> name >> event >> name_or_id ){		
		//std::cout<<name<<" "<<event<<" "<<name_or_id<<"\n";
		if( event == "likes" && target_user.get("likes")=="true" ){
			// the post is published by the username ?
			if( match(vt_post, name_or_id, username) ){
				vt.push_back( likeNotification(name) );
			}
		}else if( event == "tags" && target_user.get("tags")=="true" ){
			if( name_or_id.compare(username) == 0 ){
				vt.push_back( tagNotification(name) );
			}
		}else if( event == "comments_on" && target_user.get("comments")=="true" ){
			// the post is published by the username ?
			if( match(vt_post, name_or_id, username) ){
				vt.push_back( commentNotification(name) );
			}
		}else if( event == "follows" && target_user.get("newFollowers")=="true" ){
			if( name_or_id.compare(username) == 0 ){
				vt.push_back( followNotification(name) );
			}
		}else if( event == "messageRequests" && target_user.get("messageRequests")=="true" ){
			if( name_or_id.compare(username) == 0 ){
				vt.push_back( requestNotification(name) );
			}
		}
	}
	
	eventFile.close();
}

// notification aggregation
void aggregation(std::vector<Notification> &vt, char *filename){
	std::string output = "";
	int total_number = 0;
	for(int i=(int)vt.size()-1; i>=0; ){
		std::string type = vt[i].get_type();
		int num = 1;
		while( i-num>=0 && vt[i-num].get_type().compare(type)==0 )
			num++;
		
		if( num >= 4 ){
			output += vt[i].get_username()+", "+vt[i-1].get_username();
			output += " and "+std::to_string(num-2)+" others";
			i -= num;
		}else{
			output += vt[i].get_username();
			i -= 1;
		}
		
		if( type == "like" ){
			output += " liked your post.\n";
		}else if( type == "tag" ){
			output += " tagged you in a post.\n";
		}else if( type == "comment" ){
			output += " commented on your post.\n";
		}else if( type == "follow" ){
			output += " started following you.\n";
		}else if( type == "request" ){
			output += " wants to send you a message.\n";
		}

		total_number += 1;
		if( total_number == 100 ) break;
	}
	
	std::ofstream outFile( filename );
	outFile << output;
	outFile.close();
}


int main(int argc, char* argv[]) {
	try{
		if( argc < 6 ) throw -1;
	}
	catch (...){
		std::cout<<"error: missing parameters!\n";
		return 0;
	}
	
	
	char *postFile = argv[1];
	char *userFile = argv[2];
	char *eventFile = argv[3];
	char *outputFile = argv[4];
	//char *username = argv[5];
	std::string username = argv[5];
	
	// store all the posts
	std::vector<Post> vt_post;
	read_post_file( postFile, username, vt_post );
	
	// read the user file, and return the User with username
	User target_user = read_user_file( userFile, username );
	
	//std::cout<<vt_post.size()<<"\n";
	
	// get the notification
	std::vector<Notification> vt_ntf;
	read_event_file( eventFile, username, vt_ntf, vt_post, target_user );
	
	// notification aggregation
	aggregation( vt_ntf, outputFile );
	
	return 0;
}

