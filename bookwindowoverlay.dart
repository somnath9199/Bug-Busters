import 'dart:convert';

import 'package:flutter/material.dart';                  
import 'package:mediq_remake/components/chipbutton.dart';
import 'package:mediq_remake/constants.dart';             
import "package:http/http.dart" as http;                       
import 'package:pointer_interceptor/pointer_interceptor.dart';

class BookWindowOverlay extends StatelessWidget {
  final String bedKey;
  final String userID;
  final String hospitalID; 
  final Function(bool isSuccess)? onBookCompletedCallback;
  final OverlayEntry overlayEntry;
  BookWindowOverlay(
      {super.key,
      required this.bedKey,
      required this.hospitalID,
      required this.userID,
      this.onBookCompletedCallback,
      required this.overlayEntry});

  String bookNowText = "Book Now";
  Color bookNowBkColor = kUltraViolet;

  void bookNow(String requestedBed, overlayEntry, bnState) async {
    bnState(() {
      bookNowText = "Booking...";
    }); 
    try {
      await Future.delayed(const Duration(seconds: 3), () {});
      Map payloadData = {
        "hospitalID": hospitalID,
        "orderBed": requestedBed,
        "userID": userID,
        "isSpecialServiceRequired": isSpecialServicesRequired ? "1" : "0"
      };

      var response = await http.post(Uri.http(baseUrl, 'api/bookHospitalBed'),
          headers: {"Content-Type": "application/json"},
          body: jsonEncode(payloadData));
      if (response.statusCode == 200) {
        bnState(() async {
          bookNowText = "Success";
          bookNowBkColor = kAccentColor2;
          await Future.delayed(const Duration(milliseconds: 600), () {
            onBookCompletedCallback!(true);
          });
        });
      } else {
        bnState(() async {
          bookNowText = "Failed";
          bookNowBkColor = const Color(0XFFe5383b);
          await Future.delayed(const Duration(milliseconds: 600), () {
            onBookCompletedCallback!(false);
          });
        });
      }
      try {
        await Future.delayed(const Duration(seconds: 4), () {
          bnState(() {
            bookNowText = "Book Now";
            bookNowBkColor = kUltraViolet;
          });
        });
      } catch (e) {
        //pass
      }
    } catch (e) {
    }
